const { getStatement, getStatementLength } = require("../statements");
const { getPositiveStatement, getNegativeStatement } = require("../lib");
const Alexa = require("ask-sdk");

const handleLaunch = async (handlerInput) => {
  const { attributesManager } = handlerInput;
  const requestAttributes = attributesManager.getRequestAttributes();
  let attributes = {};
  try {
    attributes = (await attributesManager.getPersistentAttributes()) || {};
  } catch (e) {
    attributes = {
      debug: true,
    };
  }

  attributes = {
    // Initialize attributes for first open
    gamesPlayed: 420,
    gameState: "ENDED",
    debug: false,
    indexes: {
      easy: 0,
      hard: 0,
    },
    ...attributes,
  };

  // Quick launch the game by skipping the "Would you like to play" question
  // Just immediately ask which difficulty they want on launch
  attributes.gameState = "STARTED";

  attributesManager.setSessionAttributes(attributes);

  let speechOutput;
  if (attributes.debug) {
    // This is a debug session
    speechOutput = requestAttributes.t("LAUNCH_MESSAGE_DEBUG");
  } else {
    if (attributes.gamesPlayed === 0) {
      // User has never played before
      speechOutput = requestAttributes.t("LAUNCH_MESSAGE_FIRST_TIME");
    } else {
      // User has played before
      speechOutput = requestAttributes.t("LAUNCH_MESSAGE");
    }
  }

  return handlerInput.responseBuilder
    .speak(speechOutput)
    .reprompt(speechOutput)
    .getResponse();
};

const handleReset = async (handlerInput) => {
  const { attributesManager } = handlerInput;
  const requestAttributes = attributesManager.getRequestAttributes();
  const sessionAttributes = attributesManager.getSessionAttributes();

  sessionAttributes.gamesPlayed = 0;
  sessionAttributes.indexes = {
    easy: 0,
    hard: 0,
  };

  try {
    attributesManager.setPersistentAttributes(sessionAttributes);
    await attributesManager.savePersistentAttributes();
  } catch (e) {}

  return handlerInput.responseBuilder
    .speak(requestAttributes.t("RESET_SUCCESS_MESSAGE"))
    .reprompt(requestAttributes.t("RESET_SUCCESS_MESSAGE"))
    .getResponse();
};

const handleDifficulty = (handlerInput) => {
  const { attributesManager } = handlerInput;
  const requestAttributes = attributesManager.getRequestAttributes();
  const sessionAttributes = attributesManager.getSessionAttributes();

  // Get chosen difficulty
  const chosenDifficulty = Alexa.getSlotValue(
    handlerInput.requestEnvelope,
    "difficulty"
  );

  // Store chosen difficulty
  sessionAttributes.chosenDifficulty = chosenDifficulty;
  console.log("chosenDifficulty:", chosenDifficulty);

  let statement = getStatement(
    chosenDifficulty,
    sessionAttributes.indexes[chosenDifficulty]
  );

  sessionAttributes.gameState = "THINKING";
  sessionAttributes.statement = statement;
  console.log("statement:", statement);

  const speechOutput = requestAttributes.t(
    "YES_REPROMPT",
    statement.s1,
    statement.s2,
    statement.s3
  );
  return handlerInput.responseBuilder
    .speak(speechOutput)
    .reprompt(speechOutput)
    .getResponse();
};

const handleYes = (handlerInput) => {
  const { attributesManager } = handlerInput;
  const requestAttributes = attributesManager.getRequestAttributes();
  const sessionAttributes = attributesManager.getSessionAttributes();

  console.log(
    "sessionAttributes.chosenDifficulty:",
    sessionAttributes.chosenDifficulty
  );
  const chosenDifficulty = sessionAttributes.chosenDifficulty;
  if (chosenDifficulty) {
    // User already indicated a difficulty, don't ask again
    let statement = getStatement(
      chosenDifficulty,
      sessionAttributes.indexes[chosenDifficulty]
    );

    sessionAttributes.gameState = "THINKING";
    sessionAttributes.statement = statement;
    console.log("statement:", statement);

    const speechOutput = requestAttributes.t(
      "YES_REPROMPT",
      statement.s1,
      statement.s2,
      statement.s3
    );
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .getResponse();
  }

  // Does not happen with Quick launch...
  sessionAttributes.gameState = "STARTED";

  return handlerInput.responseBuilder
    .speak(requestAttributes.t("WHICH_DIFFICULTY_MESSAGE"))
    .reprompt(requestAttributes.t("WHICH_DIFFICULTY_MESSAGE"))
    .getResponse();
};

const handleNo = async (handlerInput) => {
  const { attributesManager } = handlerInput;
  const requestAttributes = attributesManager.getRequestAttributes();

  const sessionAttributes = attributesManager.getSessionAttributes();

  sessionAttributes.gameState = "ENDED";

  try {
    attributesManager.setPersistentAttributes(sessionAttributes);
    await attributesManager.savePersistentAttributes();
  } catch (e) {}

  return handlerInput.responseBuilder
    .speak(requestAttributes.t("EXIT_MESSAGE"))
    .getResponse();
};

const handleStatementPick = async (handlerInput) => {
  const { attributesManager } = handlerInput;
  const requestAttributes = attributesManager.getRequestAttributes();
  const sessionAttributes = attributesManager.getSessionAttributes();

  // Get picked statement
  const number = parseInt(
    Alexa.getSlotValue(handlerInput.requestEnvelope, "number"),
    10
  );
  const ordinal = Alexa.getSlotValue(handlerInput.requestEnvelope, "ordinal");
  let pickedStatement = number || ordinal;

  const targetStatement = sessionAttributes.statement.lie;
  const explanation = sessionAttributes.statement.lieExplanation;
  sessionAttributes.gamesPlayed += 1;
  sessionAttributes.indexes[sessionAttributes.chosenDifficulty] += 1;
  const completedAll =
    sessionAttributes.indexes[sessionAttributes.chosenDifficulty] >=
    getStatementLength(sessionAttributes.chosenDifficulty);
  let statement = {};
  if (completedAll) {
    // This will ask the user which difficulty they would like to play next.
    sessionAttributes.gameState = "STARTED";

    sessionAttributes.chosenDifficulty = undefined;
  } else {
    // Get next statement
    statement = getStatement(
      sessionAttributes.chosenDifficulty,
      sessionAttributes.indexes[sessionAttributes.chosenDifficulty]
    );
    sessionAttributes.statement = statement;
    console.log("statement2:", statement);
  }

  try {
    attributesManager.setPersistentAttributes(sessionAttributes);
    await attributesManager.savePersistentAttributes();
  } catch (e) {}

  if (pickedStatement !== targetStatement) {
    // Incorrect pick
    const speechOutput = requestAttributes.t(
      "INCORRECT_MESSAGE" + (completedAll ? "_COMPLETED_ALL" : ""),
      getNegativeStatement(),
      pickedStatement.toString(),
      targetStatement,
      explanation,
      statement.s1,
      statement.s2,
      statement.s3
    );
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .getResponse();
  } else if (pickedStatement === targetStatement) {
    // Correct pick
    const speechOutput = requestAttributes.t(
      "GUESS_CORRECT_MESSAGE" + (completedAll ? "_COMPLETED_ALL" : ""),
      getPositiveStatement(),
      pickedStatement.toString(),
      explanation,
      statement.s1,
      statement.s2,
      statement.s3
    );
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .getResponse();
  }

  const speechOutput = requestAttributes.t("FALLBACK_THINKING");
  return handlerInput.responseBuilder
    .speak(speechOutput)
    .reprompt(speechOutput)
    .getResponse();
};

const handleUnhandled = (handlerInput) => {
  const { attributesManager } = handlerInput;
  const requestAttributes = attributesManager.getRequestAttributes();
  const sessionAttributes = attributesManager.getSessionAttributes();

  const gameState = sessionAttributes.gameState;
  let speechOutput;

  if (gameState === "STARTED") {
    // User should say difficulty
    speechOutput = requestAttributes.t("UNHANDLED_STARTED");
  } else if (gameState === "THINKING") {
    // User should say a statement
    // Doesn't actually happen in reality, already handled in statement picker handler
    speechOutput = requestAttributes.t("UNHANDLED_THINKING");
  } else {
    speechOutput = requestAttributes.t("UNHANDLED_OTHER");
  }

  return handlerInput.responseBuilder
    .speak(speechOutput)
    .reprompt(speechOutput)
    .getResponse();
};

const handleRepeatStatements = (handlerInput) => {
  const { attributesManager } = handlerInput;
  const requestAttributes = attributesManager.getRequestAttributes();
  const sessionAttributes = attributesManager.getSessionAttributes();

  const statement = sessionAttributes.statement;

  const speechOutput = requestAttributes.t(
    "REPEAT_STATEMENTS",
    statement.s1,
    statement.s2,
    statement.s3
  );

  return handlerInput.responseBuilder
    .speak(speechOutput)
    .reprompt(speechOutput)
    .getResponse();
};

module.exports = {
  handleLaunch,
  handleReset,
  handleDifficulty,
  handleYes,
  handleNo,
  handleStatementPick,
  handleUnhandled,
  handleRepeatStatements,
};

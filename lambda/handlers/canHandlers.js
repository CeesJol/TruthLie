const Alexa = require("ask-sdk");

const canHandle = (handlerInput, intent) => {
  // only start a new game if yes is said when not playing a game.
  let isCurrentlyPlaying = false;
  const { attributesManager } = handlerInput;
  const sessionAttributes = attributesManager.getSessionAttributes();

  if (
    sessionAttributes.gameState &&
    (sessionAttributes.gameState === "STARTED" ||
      sessionAttributes.gameState === "THINKING")
  ) {
    isCurrentlyPlaying = true;
  }

  return (
    !isCurrentlyPlaying &&
    Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
    Alexa.getIntentName(handlerInput.requestEnvelope) === intent
  );
};

module.exports = {
  canHandle,
};

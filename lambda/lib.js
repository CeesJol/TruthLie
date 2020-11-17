const STATEMENTS = [
  // NEGATIVE
  [
    "That’s an excellent guess.",
    "That's an understandable choice.",
    "That's a very good attempt.",
    "That's a very reasonable guess.",
    "Nice try, but that's not the answer.",
  ],
  // POSITIVE
  [
    "Good job!",
    "Nicely done!",
    "Well done!",
    "Good pick!",
    "Very well!",
    "Correct!",
  ],
];

const getFeedbackStatement = (positive) => {
  let p = positive ? 1 : 0;
  return {
    text: STATEMENTS[p][Math.floor(Math.random() * STATEMENTS.length)],
    aplText: positive ? "Well done!" : "Good try.",
    positive,
  };
};

const initializeAttributes = () => {
  return {
    gamesPlayed: 0,
    gameState: "STARTED",
    debug: false,
    indexes: {
      easy: 0,
      hard: 0,
    },
  };
};

const getReadableStatement = (statement) => {
  if (
    !statement ||
    (Object.keys(statement).length === 0 && statement.constructor === Object)
  ) {
    return "";
  }
  const { s1, s2, s3 } = statement;
  return `1. ${s1} <br /> 2. ${s2} <br /> 3. ${s3}`;
};

module.exports = {
  getFeedbackStatement,
  initializeAttributes,
  getReadableStatement,
};

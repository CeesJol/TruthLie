const getPositiveStatement = () => {
  const statements = [
    "Good job!",
    "Nicely done!",
    "Well done!",
    "Good pick!",
    "Very well!",
  ];

  return statements[Math.floor(Math.random() * statements.length)];
};

const getNegativeStatement = () => {
  const statements = [
    "That’s an excellent guess.",
    "That's an understandable choice.",
    "That's a very good attempt.",
    "That's a very reasonable guess.",
    "Nice try, but that's not the answer.",
  ];

  return statements[Math.floor(Math.random() * statements.length)];
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

module.exports = {
  getPositiveStatement,
  getNegativeStatement,
  initializeAttributes,
};

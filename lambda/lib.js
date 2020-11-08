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
  ];

  return statements[Math.floor(Math.random() * statements.length)];
};

module.exports = {
  getPositiveStatement,
  getNegativeStatement,
};

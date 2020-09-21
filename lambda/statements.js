const statements = [
  {
    s1: "Hi",
    s2: "Dear",
    s3: "Friend",
    lie: 1,
  },
];

const getRandomStatement = () => {
  const random = Math.floor(Math.random() * statements.length);
  return statements[random];
};

module.exports = {
  statements,
  getRandomStatement,
};

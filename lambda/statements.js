const statements = [
  {
    s1: "My favorite color is red.",
    s2: "Potatoes are less healthy than sweet potatoes.",
    s3: "I like trains.",
		lie: 1,
		lieExplanation: "Statement one was a lie: my favorite color is actually blue. Navy blue, specifically!"
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

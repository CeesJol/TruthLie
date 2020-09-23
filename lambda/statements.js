const EASY_STATEMENTS = [
  {
    s1: "My favorite color is red.",
    s2: "Potatoes are less healthy than sweet potatoes.",
    s3: "I like trains.",
    lie: 1,
    lieExplanation:
      "My favorite color is actually blue. Navy blue, specifically!",
  },
  {
    s1: "At 828 meters, The Burj Khalifa is the tallest building on earth.",
    s2: "Canada is the biggest country in the world.",
    s3: "There is a McDonald’s in every continent except Antartica.",
    lie: 2,
    lieExplanation:
      "Canada is 2.8 million square miles, but Russia easily beats it with over 6.6 million square miles. With that, Russia is the world's largest country by landmass.",
  },
];

const HARD_STATEMENTS = [
  {
    s1: "This one is true.",
    s2: "This one is a lie.",
    s3: "This one is true.",
    lie: 2,
    lieExplanation: "I didn't lie!",
  },
];

const ALL_STATEMENTS = [...EASY_STATEMENTS, ...HARD_STATEMENTS];

const getRandomStatement = () => {
  const random = Math.floor(Math.random() * ALL_STATEMENTS.length);
  return ALL_STATEMENTS[random];
};

const getStatement = (difficulty, index) => {
  let result;
  switch (difficulty) {
    // difficulty value comes from intent, so use lowercase
    case "easy":
      result = EASY_STATEMENTS[index];
      break;
    case "hard":
      result = HARD_STATEMENTS[index];
      break;
  }

  if (!result) {
    result = getRandomStatement();
  }

  return result;
};

module.exports = {
  getStatement,
};

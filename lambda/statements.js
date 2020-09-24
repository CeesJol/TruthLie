const STATEMENTS = {
  /* Template
	{
		s1: "",
		s2: "",
		s3: "",
		lie: 0,
		lieExplanation: "",
	},
	*/
  easy: [
    {
      s1: "At 828 meters, The Burj Khalifa is the tallest building on earth.",
      s2: "Canada is the biggest country in the world.",
      s3: "There is a McDonald’s in every continent except Antartica.",
      lie: 2,
      lieExplanation:
        "Canada is 2.8 million square miles, but Russia easily beats it with over 6.6 million square miles. With that, Russia is the world's largest country by landmass.",
    },
    // /**
    //  * Source
    //  * https://www.goodtoknow.co.uk/family/facts-for-kids-5446
    //  */
    // {
    //   s1:
    //     "In the United Kingdom, it is illegal to stand within 90 metres of the Queen without socks on.",
    //   s2: "Water covers 70% of Earth.",
    //   s3: "Apples sink in water.",
    //   lie: 3,
    //   lieExplanation:
    //     "Apples don't sink in water - they float! An apple consists for 25% out of air, causing it to float on water.",
    // },
    // /**
    //  * Source
    //  * https://www.goodtoknow.co.uk/family/facts-for-kids-5446
    //  */
    // {
    //   s1: "Cats sleep for 13 to 14 hours a day.",
    //   s2: "Dogs have much better hearing than humans.",
    //   s3: "Dolphins can breathe under water.",
    //   lie: 3,
    //   lieExplanation:
    //     "Dolphins need air to breathe. They use a blowhole on top of their heads to breathe.",
    // },
    // /**
    //  * Source
    //  * https://www.goodtoknow.co.uk/family/facts-for-kids-5446
    //  */
    // {
    //   s1: "Other than on Earth, Mars is the only planet we've found life on.",
    //   s2:
    //     "Jupiter is the largest planet in our Solar system. It is so big that more than 1300 Earths could fit inside it.",
    //   s3:
    //     "The rings of Saturn are made up of millions of ice crystals, some as big as houses and others as small as specks of dust.",
    //   lie: 1,
    //   lieExplanation: "No life has ever been found on Mars.",
    // },
    // /**
    //  * Source
    //  * https://www.theactivetimes.com/adventure/n/ridiculous-facts-you-didnt-know-were-true
    //  */
    // {
    //   s1: "Toilet seats are cleaner than your cell phone.",
    //   s2: "Chewing gum can only be digested after 7 years.",
    //   s3: "Tsunamis can move at speeds over 500 miles per hour!",
    //   lie: 2,
    //   lieExplanation:
    //     "Chewing gum can’t be digested at all, not even after 7 years. Don't worry though - it won't get stuck in your body either!",
    // },
  ],
  hard: [
    /*
     * Source
     * https://www.theactivetimes.com/adventure/n/ridiculous-facts-you-didnt-know-were-true
     */
    {
      s1: "Your stomach acid is strong enough to dissolve metal.",
      s2: "The lion is the loudest animal on Earth at 118 decibels.",
      s3: "Wild dolphins call each other by name.",
      lie: 2,
      lieExplanation:
        "The lion is not the loudest animal. Being able to produce an incredible 230 decibels, the sperm whale is the loudest of them all!",
    },
    /*
     * Source
     * https://www.theactivetimes.com/adventure/n/ridiculous-facts-you-didnt-know-were-true
     */
    {
      s1: "Ancient Romans used puke to whiten their teeth.",
      s2: "An apple you buy in the grocery store could be over a year old.",
      s3:
        "Blue whale hearts weigh almost a ton and beat once every 10 seconds.",
      lie: 1,
      lieExplanation:
        "Only slightly less disgusting but true, ancient Romans used not puke, but urine to whiten their teeth. ",
    },
    /**
     * Source
     * https://redtri.com/quirky-facts-and-trivia-for-kids/slide/1
     */
    {
      s1: "Some tornadoes can be faster than Formula One race cars.",
      s2: "Carrots weren't always orange: they were once exclusively purple.",
      s3: "Sounds in space can be heard from thousands of miles away.",
      lie: 3,
      lieExplanation:
        "You can't hear sounds in space: sound does not carry in space.",
    },
    /**
     * Source
     * https://www.signupgenius.com/home/trivia-questions-for-kids.cfm
     */
    {
      s1: "Slugs have three noses.",
      s2: "Venus has a day that lasts almost eight months on Earth.",
      s3: "The olympic games originated in Greece.",
      lie: 1,
      lieExplanation: "Slugs have even more noses than three: they have four!",
    },
    /**
     * Source
     * https://www.thefactsite.com/100-amazing-facts-you-never-knew/
     * https://in.pinterest.com/mukeshkorrapati/myth-and-facts/
     */
    {
      s1: "You can fire an arrow around an object to hit a target.",
      s2:
        "The Burj Khalifa is so tall you can see two sunsets from it in one day.",
      s3: "You can talk to another skydiver during free fall",
      lie: 3,
      lieExplanation:
        "The wind traveling past your ears makes you deaf to all sounds.",
    },
  ],
};

const getStatement = (difficulty, index) => {
  let result = STATEMENTS[difficulty][index];

  if (!result) {
    // If user has played all statements of this difficulty, pick a random one
    console.log("Max number of statements reached!");
    const random = Math.floor(Math.random() * STATEMENTS[difficulty].length);
    return STATEMENTS[difficulty][random];
  }

  return result;
};

const getStatementLength = (difficulty) => STATEMENTS[difficulty].length;

module.exports = {
  getStatement,
  getStatementLength,
};

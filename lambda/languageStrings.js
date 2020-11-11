const SPEECH_STATEMENTS =
  "Statement one is: %s Statement two is: %s And statement three is: %s Now, which one do you think is a lie?";

module.exports = {
  translation: {
    SKILL_NAME: "Two Truths and a Lie Game",
    EXIT_MESSAGE: "Thanks for playing!",
    FALLBACK_ENDED: `I can't help you with that.  I will tell two truths and  a lie and you try to tell which one is the lie. Would you like to play?`,
    FALLBACK_STARTED: `Please indicate which difficulty you want: easy or hard?`,
    FALLBACK_THINKING: `Say which of the three statements was a lie, or say 'repeat the statements'.`,
    GUESS_CORRECT_MESSAGE: `%s Statement %s was indeed a lie! %s Here are the next three statements. ${SPEECH_STATEMENTS}`,
    GUESS_CORRECT_MESSAGE_COMPLETED_ALL:
      "%s Statement %s was indeed a lie! %s You have completed all questions for this difficulty. The difficulty levels are easy and hard. Which difficulty would you like to try next?",
    LAUNCH_MESSAGE_FIRST_TIME:
      "Welcome to Two Truths and a Lie. In two truths and a lie, I will tell you three statements: two are true, and one is a lie. It is on you to tell which one is a lie. Say a difficulty level, easy or hard, to get started!",
    LAUNCH_MESSAGE:
      "Welcome to Two Truths and a Lie. Say a difficulty level, easy or hard, to get started!",
    LAUNCH_MESSAGE_DEBUG:
      "Welcome debugger. Say a difficulty level, easy or hard, to get started!",
    INCORRECT_MESSAGE: `%s Statement %s was not a lie. Statement %s was a lie: %s Here are the next three statements. ${SPEECH_STATEMENTS}`,
    INCORRECT_MESSAGE_COMPLETED_ALL:
      "%s Statement %s was not a lie. Statement %s was a lie: %s You have completed all questions for this difficulty. The difficulty levels are easy and hard. Which difficulty would you like to try next?",
    // REPEAT
    REPEAT_STATEMENTS:
      "The statements were: %s %s %s Which one do you think is a lie?",
    // HELP MESSAGES
    UNHANDLED_OTHER: "Say yes to play or no to quit.",
    UNHANDLED_STARTED:
      "Say a difficulty level, easy or hard, to start the game.",
    UNHANDLED_THINKING:
      "Say which of the three statements was a lie, or say 'repeat the statements'.",
    HELP_MESSAGE:
      "I will tell you two truths and a lie, you tell me which one is a lie and I will tell you if you were right.",
    HELP_REPROMPT: "Say yes to play.",
    ERROR_MESSAGE: "Sorry, an error occurred.",
    YES_MESSAGE: `Great! ${SPEECH_STATEMENTS}`,
    YES_REPROMPT: `I tell you three statements and you guess which one is a lie. ${SPEECH_STATEMENTS}`,
    WHICH_DIFFICULTY_MESSAGE:
      "Nice! Which difficulty would you like to play, easy or hard?",
    RESET_SUCCESS_MESSAGE:
      "Successfully resetted your stats. Would you like to play?",
  },
};

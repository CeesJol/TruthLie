const { supportsAPL } = require("./util");
const constants = require("./constants");
const { getReadableStatement } = require("./lib");

const addApl = (handlerInput, requestAttributes, statement, feedback) => {
  // Add APL directive to response
  if (supportsAPL(handlerInput)) {
    // const { Viewport } = handlerInput.requestEnvelope.context;
    // const resolution = Viewport.pixelWidth + "x" + Viewport.pixelHeight;
    handlerInput.responseBuilder.addDirective({
      type: "Alexa.Presentation.APL.RenderDocument",
      version: "1.4",
      document: constants.APL.statementsDoc,
      datasources: {
        launchData: {
          type: "object",
          properties: {
            headerTitle: requestAttributes.t("SKILL_NAME"),
            feedbackText: feedback.aplText || "",
            feedbackColor: feedback.positive ? "green" : "red",
            statementsText: getReadableStatement(statement),
          },
        },
      },
    });
  }

  // Add home card to response
  // If you're using an Alexa Hosted Skill the images below will expire
  // and could not be shown in the card. You should replace them with static images
  handlerInput.responseBuilder.withStandardCard(
    requestAttributes.t("SKILL_NAME")
  );
};

module.exports = { addApl };

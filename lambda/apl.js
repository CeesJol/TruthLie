const { supportsAPL, getS3PreSignedUrl } = require("./util");
const constants = require("./constants");
const { getReadableStatement } = require("./lib");

const addApl = (
  handlerInput,
  requestAttributes,
  statement,
  completedAll,
  feedback
) => {
  // Add APL directive to response
  if (supportsAPL(handlerInput)) {
    const { Viewport } = handlerInput.requestEnvelope.context;
    const resolution = Viewport.pixelWidth + "x" + Viewport.pixelHeight;
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
            backgroundImage: getS3PreSignedUrl(
              "Media/cake_" + resolution + ".png"
            ),
          },
        },
      },
    });
  }

  // Add home card to response
  // If you're using an Alexa Hosted Skill the images below will expire
  // and could not be shown in the card. You should replace them with static images
  handlerInput.responseBuilder.withStandardCard(
    requestAttributes.t("SKILL_NAME"),
    420,
    getS3PreSignedUrl("Media/cake_480x480.png")
  );
};

module.exports = { addApl };

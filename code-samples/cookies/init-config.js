/* AxeptIO Config */

const clientId = env.axeptio_client_id;

const cookiesVersion = env.axeptio_cookies_version;

/* Google Analytics Config */

const tagManagerArgs = {
  gtmId: env.google_tag_manager_id,
};

/* Facebook Config */

const facebookPixelId = env.facebook_pixel_id;

/* Initializing the configs */
export const initializeAnalyticsConfig = () => {
  window.axeptioSettings = {
    clientId,
    cookiesVersion,
  };

  // Initializing the cookies
  const axeptioJs = document.createElement("script");
  axeptioJs.setAttribute("async", "");
  axeptioJs.setAttribute("src", "https://static.axept.io/sdk.js");
  document.head.appendChild(axeptioJs);

  void 0 === window._axcb && (window._axcb = []);

  window._axcb.push(function (axeptio) {
    axeptio.on("cookies:complete", function (choices) {
      if (choices.google_analytics) {
        /* Google Tag Manager Initialization */
        TagManager.initialize(tagManagerArgs);
      }
      if (choices.facebook_pixel) {
        /* Facebook Pixel Initialization */
        ReactPixel.init(facebookPixelId);
        ReactPixel.pageView();
      }
      if (choices.snapchat_pixel) {
        /* SnapChat Pixel Initialization */
        const snapChatJs = document.createElement("script");
        snapChatJs.setAttribute("async", "");
        snapChatJs.setAttribute("src", "https://sc-static.net/scevent.min.js");
        document.head.appendChild(snapChatJs);
      }
    });
  });
};

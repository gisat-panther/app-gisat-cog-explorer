"use client";
import { appKey, gaId } from "../constants/app";
import Analytics from "analytics";
// @ts-ignore
import googleAnalytics from "@analytics/google-analytics";

/* Initialize analytics & load plugins */
const analytics = Analytics({
  app: appKey,
  plugins: [
    googleAnalytics({
      //disable tracking while development
      measurementIds: [process.env.NODE_ENV === "development" ? null : gaId],
      customDimensions: {
        // userGroups: 'dimension1',
      },
    }),
  ],
});

/* Track a page view */
analytics.page();

export default analytics;

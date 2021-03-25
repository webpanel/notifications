import { i18n } from "i18next";

export const i18nAddResourceBundles = (i18n: i18n) => {
  i18n.addResourceBundle("en", "webpanel-notifications", {
    markAsRead: "Mark all as read",
  });
  i18n.addResourceBundle("cs", "webpanel-notifications", {
    markAsRead: "Označit vše jako přečtené",
  });
};

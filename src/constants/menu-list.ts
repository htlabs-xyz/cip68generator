import { NavItem } from "@/types";
import { routes } from "./routes";
import { appSocialMedia } from "./app-socialmedia";

export const landingMenu: NavItem[] = [
  {
    title: "Dashboard",
    href: routes.home.redirect,
    icon: "house",
    disabled: false,
  },
  {
    title: "Mint",
    href: routes.mint.redirect,
    icon: "imagePlus",
    disabled: false,
  },
  {
    title: "Utilities",
    href: routes.utilities.redirect,
    icon: "circuitBoard",
    disabled: false,
  },
  {
    title: "Documentation",
    href: routes.document.redirect,
    icon: "bookText",
    disabled: true,
  },
];

export const mainMenu: NavItem[] = [
  {
    title: "Dashboard",
    href: routes.home.redirect,
    icon: "house",
    disabled: false,
  },
  {
    title: "Mint",
    href: routes.mint.redirect,
    icon: "imagePlus",
    disabled: false,
  },
  {
    title: "Utilities",
    href: routes.utilities.redirect,
    icon: "circuitBoard",
    disabled: false,
  },
  {
    title: "Documentation",
    href: routes.document.redirect,
    icon: "bookText",
    disabled: true,
  },
];

export const bottomItem: NavItem[] = [
  {
    title: "Website",
    href: appSocialMedia.website,
    icon: "globe",
    disabled: false,
  },
  {
    title: "Telegram",
    href: appSocialMedia.telegram,
    icon: "send",
    disabled: false,
  },
  {
    title: "Catalyst",
    href: "https://projectcatalyst.io/funds/12/cardano-use-cases-concept/open-source-dynamic-assets-tokennft-generator-cip68",
    icon: "catalyst",
    disabled: false,
  },
  {
    title: "Youtube",
    href: appSocialMedia.youtube,
    icon: "youtube",
    disabled: false,
  },
];

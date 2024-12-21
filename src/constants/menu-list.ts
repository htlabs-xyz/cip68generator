import { NavItem } from "@/types";
import { routes } from "./routes";

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
    icon: "store",
    disabled: true,
  },
];

export const mainMenu: NavItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: "house",
    disabled: false,
  },
  {
    title: "Mint Page",
    href: "/dashboard/mint",
    icon: "imagePlus",
    disabled: false,
  },
  {
    title: "Utilities",
    href: "/dashboard/utilities",
    icon: "circuitBoard",
    disabled: false,
  },
  {
    title: "Documentation",
    href: "#",
    icon: "store",
    disabled: true,
  },
];

export const bottomItem: NavItem[] = [
  {
    title: "Website",
    href: "https://cardano2vn.io",
    icon: "globe",
    disabled: false,
  },
  {
    title: "Telegram",
    href: "https://t.me",
    icon: "send",
    disabled: false,
  },
  {
    title: "IdeaScale",
    href: "https://cardano.ideascale.com",
    icon: "ideaScale",
    disabled: false,
  },
  {
    title: "Youtube",
    href: "https://youtube.com",
    icon: "youtube",
    disabled: false,
  },
];

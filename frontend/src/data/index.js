import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { FiUser, FiHelpCircle } from "react-icons/fi";
import { AiOutlineFileText } from "react-icons/ai";

export const menuList = [
  {
    text: "Profile",
    Icon: FiUser,
    href: "/profile",
  },
  {
    text: "Integrations",
    Icon: IoExtensionPuzzleOutline,
    href: "/settings",
  },
  {
    text: "Guide",
    Icon: AiOutlineFileText,
    href: "/guide",
  },
  {
    text: "Help Center",
    Icon: FiHelpCircle,
    href: "help-center",
  },
];

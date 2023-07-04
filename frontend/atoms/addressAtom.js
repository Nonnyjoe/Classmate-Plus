import { atom } from "recoil";

export const addressState = atom({
  key: "addressState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

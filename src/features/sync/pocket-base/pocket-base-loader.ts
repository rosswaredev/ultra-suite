import { applySnapshot } from "mobx-keystone";
import { pb } from "./pocket-base";

export const pocketBaseLoader = () => {
  // Subscribe to changes in any habits record
  pb.collection("habits").subscribe("*", function (e) {
    console.log(e.record);
  });
};

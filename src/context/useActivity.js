import { useContext } from "react";
import { ActivityContext } from "./ActivityContext";

export function useActivity() {
  return useContext(ActivityContext);
}
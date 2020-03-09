import { debounce as debounceHelper, throttle as throttleHelper } from "../../";
import { decoratorGenerator } from "./decoratorGenerator";

export const debounce = decoratorGenerator(debounceHelper);
export const throttle = decoratorGenerator(throttleHelper);

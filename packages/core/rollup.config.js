import pkg from "./package.json";
import { generateRollupConfig } from "../../rollup.lerna";

export default generateRollupConfig(pkg, "./src/component.ts");

import { getCleanString } from "../lib/getCleanString";

const testString = `
Hello
  World  you're   wonderful!
`;

test("should clean strings from double whitespace and from line-breaks", () => {
  expect(getCleanString(testString)).toBe("Hello World you're wonderful!");
});

import { getWordCount } from "../lib/getWordCount";

const wordTests = [
  {
    words: "yolo",
    expected: 1
  },
  {
    words: "hey ho lets go",
    expected: 4
  },
  {
    words: "hey ho let's go",
    expected: 4
  }
];

test("should count 1 word", () => {
  for (let i = 0; i < wordTests.length; i++) {
    const testCase = wordTests[i];
    expect(getWordCount(testCase.words)).toBe(testCase.expected);
  }
});

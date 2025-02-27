import { describe, it, expect } from "vitest";
import { toTreeString } from "./to-tree-string.js";

describe("toTreeString", () => {
  it("should convert a basic nested structure correctly", () => {
    const input = `src
  app
    index.js
  public
    image-01.jpg
    image-02.jpg
index.html
package.json`;

    const expected = `.
├── src
│   ├── app
│   │   └── index.js
│   └── public
│       ├── image-01.jpg
│       └── image-02.jpg
├── index.html
└── package.json
`;

    expect(toTreeString(input)).toBe(expected);
  });

  it("should handle empty directories", () => {
    const input = `project
  src
    components
    pages
    utils`;

    const expected = `.
└── project
    └── src
        ├── components
        ├── pages
        └── utils
`;

    expect(toTreeString(input)).toBe(expected);
  });

  it("should handle different indentation levels", () => {
    const input = `root
    level1
        level2
            file.txt
    level1-sibling`;

    const expected = `.
└── root
    ├── level1
    │   └── level2
    │       └── file.txt
    └── level1-sibling
`;

    expect(toTreeString(input)).toBe(expected);
  });

  it("should handle custom spaces per indent option", () => {
    const input = `root
   level1
      file.txt`;

    const expected = `.
└── root
    └── level1
        └── file.txt
`;

    expect(toTreeString(input, { spacesPerIndent: 3 })).toBe(expected);
  });

  it("should handle edge cases", () => {
    // Single-line input
    expect(toTreeString("root")).toBe(`.
└── root
`);

    // Empty input
    expect(toTreeString("")).toBe("");
    expect(toTreeString("   ")).toBe("");
    expect(toTreeString("\n\n")).toBe("");
  });
});

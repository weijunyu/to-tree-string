export type TreeNode = Record<string, (string | TreeNode)[]>;

const LastNodePrefix = "└──";
const MiddleNodePrefix = "├──";
const EmptyNodePrefix = "│";

/*
  images:
    01.jpg
    02.jpg

my-project:
  - src:
    - images:
      - image-01.jpg
      - image-02.jpg
      - compressed:
        - 01.jpg
        - 02.jpg
    - templates:
      - page.html
      - post.html
    - index.html
  - package.json
  - README.md
*/
export function processNode(
  input: TreeNode | string,
  level: number = 0
): string {
  if (typeof input === "string") {
    return input;
  }
  let output = "";
  for (const key of Object.keys(input)) {
    const value = input[key];
    const padding = "".padStart(level * 4, " ");

    output += key + "\n";

    if (value.length === 1) {
      output += `${padding}${LastNodePrefix} ${processNode(
        value[0],
        level + 1
      )}\n`;
    } else {
      for (let i = 0; i < value.length; i++) {
        const prefix =
          i === value.length - 1 ? LastNodePrefix : MiddleNodePrefix;
        output += `${padding}${prefix} ${processNode(value[i], level + 1)}\n`;
      }
    }
  }
  return output.trim();
}

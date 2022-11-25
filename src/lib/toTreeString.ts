export type TreeNode = Record<string, (string | TreeNode)[]>;

const LastNodePrefix = "└──";
const MiddleNodePrefix = "├──";
const EmptyNodePrefix = "│";

export function processNode(input: TreeNode | string): string[] {
  if (typeof input === "string") {
    return [input];
  }
  let output: string[] = [];
  for (const key of Object.keys(input)) {
    output.push(key);
    const children = input[key];

    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      const isLast = i === children.length - 1;
      const prefix = isLast ? LastNodePrefix : MiddleNodePrefix;

      if (typeof child === "string") {
        output.push(`${prefix} ${child}`);
      } else {
        const processed = processNode(child);
        output.push(`${prefix} ${processed[0]}`);
        for (let i = 1; i < processed.length; i++) {
          const padding = isLast
            ? "".padEnd(4, " ")
            : EmptyNodePrefix.padEnd(4, " ");
          output.push(padding + processed[i]);
        }
      }
    }
  }
  return output;
}

export function toTreeString(input: TreeNode | string): string {
  const stringArr = processNode(input);
  return stringArr.join("\n");
}

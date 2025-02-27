interface TreeOptions {
  spacesPerIndent?: number;
}

/**
 * Convert an indented string representation of a file system hierarchy
 * into a string that resembles the output of the 'tree' command.
 *
 * @param input - The indented string representation of a file system hierarchy
 * @param options - Configuration options
 * @returns A string resembling the 'tree' command output
 */
export function toTreeString(input: string, options?: TreeOptions): string {
  const lines = input
    .trim()
    .split("\n")
    .filter((line) => line.trim());

  if (lines.length === 0) return "";

  const root = toTree(lines, options);

  return stringifyTree(root);
}

interface TreeNode {
  name: string;
  children: TreeNode[];
}

interface StackEntry {
  node: TreeNode;
  level: number;
}

function toTree(lines: string[], options?: TreeOptions): TreeNode {
  const root: TreeNode = { name: ".", children: [] };
  const stack: StackEntry[] = [{ node: root, level: -1 }];

  for (const line of lines) {
    // Get first non-whitespace char index
    const indent = line.search(/\S/);
    const spacesPerIndent = options?.spacesPerIndent ?? 2;
    const level = Math.floor(indent / spacesPerIndent);
    const name = line.trim();

    const newNode: TreeNode = { name, children: [] };

    // Find the parent node based on indentation level
    while (stack.length > 1 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    stack[stack.length - 1].node.children.push(newNode);

    stack.push({ node: newNode, level });
  }
  return root;
}

function stringifyTree(node: TreeNode, prefix: string = ""): string {
  let result = "";

  if (node.name) {
    result = node.name + "\n";
  }

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    const isLast = i === node.children.length - 1;

    const connector = isLast ? "└── " : "├── ";
    result += prefix + connector + child.name + "\n";

    if (child.children.length > 0) {
      const childPrefix = prefix + (isLast ? "    " : "│   ");
      result += stringifyTree(
        { name: "", children: child.children },
        childPrefix
      );
    }
  }

  return result;
}

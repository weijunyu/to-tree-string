# to-tree-string

A TypeScript library that converts indented string representations of file system hierarchies to tree-like string outputs similar to the `tree` command.

## Installation

```bash
npm install @jywei/to-tree-string
```

## Usage

```typescript
import { toTreeString } from "@jywei/to-tree-string";

// Basic example
const input = `src
  app
    index.js
  public
    image-01.jpg
    image-02.jpg
index.html
package.json`;

console.log(toTreeString(input));
```

Output:

```
.
├── src
│   ├── app
│   │   └── index.js
│   └── public
│       ├── image-01.jpg
│       └── image-02.jpg
├── index.html
└── package.json
```

## Configuration Options

You can customize the behavior using options:

```typescript
// Using custom indentation size
const input = `root
    level1
        level2
            file1.txt
`;

// Specify 4 spaces per indentation level
console.log(toTreeString(input, { spacesPerIndent: 4 }));
```

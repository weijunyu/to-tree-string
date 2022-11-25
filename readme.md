## Summary

Generate [`tree`](<https://en.wikipedia.org/wiki/Tree_(command)>)-style output from a JSON object assuming a specific YAML structure.

Use it to quickly generate a string representation of a file tree.

Try it at https://junyuwei.gitlab.io/to-tree-string/.

## Usage

```typescript
import { toTreeString, TreeNode } from "to-tree-string";

/*
Easier to visualize this object in YAML, representing a file tree:
my-project:
  - src:
    - images:
      - image-01.jpg
      - image-02.jpg
    - templates:
      - page.html
      - post.html
    - index.html
  - package.json
  - README.md
*/

// In most cases, you shouldn't have to explicitly set type inputs as TreeNode.
// Do it if TS has trouble inferring from the declared object and yells at you.
const input: TreeNode = {
  "my-project": [
    {
      src: [
        {
          images: ["image-01.jpg", "image-02.jpg"],
        },
        {
          templates: ["page.html", "post.html"],
        },
        "index.html",
      ],
    },
    "package.json",
    "README.md",
  ],
};

console.log(toTreeString(input));

/*
my-project
├── src
│   ├── images
│   │   ├── image-01.jpg
│   │   └── image-02.jpg
│   ├── templates
│   │   ├── page.html
│   │   └── post.html
│   └── index.html
├── package.json
└── README.md
*/
```

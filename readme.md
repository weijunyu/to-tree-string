## Summary

Generate [`tree`](<https://en.wikipedia.org/wiki/Tree_(command)>)-style output from JSON.

Use it to quickly generate a string representation of a file tree.

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

// Transformed into object (or JSON):
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

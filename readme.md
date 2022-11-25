Generate `tree`-like output from a JSON object.

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

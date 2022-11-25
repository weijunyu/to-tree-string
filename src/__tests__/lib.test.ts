import { processNode, TreeNode } from "../lib/toTreeString";

describe("lib tests", function () {
  it("can produce string for a 1-level node", function () {
    const input = {
      images: ["image-01.jpg", "image-02.jpg"],
    };
    const want = `images
├── image-01.jpg
└── image-02.jpg`;
    expect(processNode(input)).toBe(want);
  });

  it("can produce string for a 2-level node", function () {
    const input: TreeNode = {
      images: [
        "image-01.jpg",
        "image-02.jpg",
        {
          compressed: ["01.jpg", "02.jpg"],
        },
      ],
    };
    const want = `images
├── image-01.jpg
├── image-02.jpg
└── compressed
    ├── 01.jpg
    └── 02.jpg`;

    expect(processNode(input)).toBe(want);
  });

  it("can produce string for a 3-level node", function () {
    const input: TreeNode = {
      images: [
        "image-01.jpg",
        "image-02.jpg",
        {
          compressed: [
            "01.jpg",
            "02.jpg",
            {
              more: ["03.jpg", "04.jpg"],
            },
          ],
        },
      ],
    };
    const want = `images
├── image-01.jpg
├── image-02.jpg
└── compressed
    ├── 01.jpg
    ├── 02.jpg
    └── more
        ├── 03.jpg
        └── 04.jpg`;

    expect(processNode(input)).toBe(want);
  });

  it("can produce string for a 2-level node, with empty node padding", function () {
    const input: TreeNode = {
      images: [
        "image-01.jpg",
        "image-02.jpg",
        {
          compressed: ["01.jpg", "02.jpg"],
        },
        "hero.jpg",
      ],
    };
    const want = `images
├── image-01.jpg
├── image-02.jpg
├── compressed
│   ├── 01.jpg
│   └── 02.jpg
└── hero.jpg`;

    expect(processNode(input)).toBe(want);
  });

  it("can full tree 1", function () {
    const input: TreeNode = {
      src: [
        {
          images: [
            "image-01.jpg",
            "image-02.jpg",
            {
              compressed: ["01.jpg", "02.jpg"],
            },
          ],
        },
        {
          templates: ["page.html", "post.html"],
        },
        "index.html",
      ],
    };
    const want = `src
├── images
│   ├── image-01.jpg
│   ├── image-02.jpg
│   └── compressed
│       ├── 01.jpg
│       └── 02.jpg
├── templates
│   ├── page.html
│   └── post.html
└── index.html`;

    expect(processNode(input)).toBe(want);
  });
  it("can full tree 2", function () {
    const input: TreeNode = {
      "my-project": [
        {
          src: [
            {
              images: [
                "image-01.jpg",
                "image-02.jpg",
                {
                  compressed: ["01.jpg", "02.jpg"],
                },
              ],
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
    const want = `my-project
├── src
│   ├── images
│       ├── image-01.jpg
│       ├── image-02.jpg
│       └── compressed
│           ├── 01.jpg
│           └── 02.jpg
│   ├── templates
│       ├── page.html
│       └── post.html
│   └── index.html
├── package.json
└── README.md`;

    expect(processNode(input)).toBe(want);
  });
});

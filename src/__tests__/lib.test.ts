import { processNode, TreeNode } from "../lib/toTreeString";

describe("lib tests", function () {
  it("can product string for a 1-level node", function () {
    const input = {
      images: ["image-01.jpg", "image-02.jpg"],
    };
    const want = `images
├── image-01.jpg
└── image-02.jpg`;
    expect(processNode(input)).toBe(want);
  });

  it("can product string for a 2-level node", function () {
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
  it("can product string for a 3-level node", function () {
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
});

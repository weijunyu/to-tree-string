import { toTreeString } from "@jywei/to-tree-string";
import { useMemo } from "react";
import { parse } from "yaml";

interface Props {
  yamlString: string;
}

function getTreeStringOutput(yamlString: string): string {
  let outputStr = "";
  try {
    const parsed = parse(yamlString);
    outputStr = toTreeString(parsed);
  } catch (err) {
    console.error("failed to convert to tree string");
    console.error(err);
    outputStr = "can't convert, please check yaml input";
  }
  return outputStr;
}

export function TreeStringOutput(props: Props) {
  if (props.yamlString === "") {
    return null;
  }

  const outputStr = useMemo(
    () => getTreeStringOutput(props.yamlString),
    [props.yamlString]
  );

  return <pre>{outputStr}</pre>;
}

import { toTreeString } from "@jywei/to-tree-string";
import { parse } from "yaml";

interface Props {
  yamlString: string;
}

export function TreeStringOutput(props: Props) {
  if (props.yamlString === "") {
    return <></>;
  }
  const s = parse(props.yamlString);
  return <pre>{toTreeString(s)}</pre>;
}

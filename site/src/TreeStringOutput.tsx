import { toTreeString } from "@jywei/to-tree-string";
import { useMemo } from "react";
import { parse } from "yaml";
import styled from "@emotion/styled";
import { CopyIcon } from "@chakra-ui/icons";
import { theme } from "@chakra-ui/theme";

import { FloatingActionButton } from "./FloatingActionButton";

interface Props {
  yamlString: string;
}

const StyledOutputContainer = styled.div`
  padding: 1rem;
  height: 100%;
  position: relative;
`;

const StyledOutputDisplay = styled.pre`
  padding: 1rem;
  &:hover {
    background: ${theme.colors.gray[200]};
    cursor: pointer;
  }
`;

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

  function copyTreeString() {
    navigator.clipboard
      .writeText(outputStr)
      .catch((err: any) =>
        console.error("couldn't copy tree string: " + err.message)
      );
  }

  return (
    <StyledOutputContainer>
      <StyledOutputDisplay>{outputStr}</StyledOutputDisplay>

      <FloatingActionButton onClick={copyTreeString}>
        <CopyIcon />
        &nbsp;Copy
      </FloatingActionButton>
    </StyledOutputContainer>
  );
}

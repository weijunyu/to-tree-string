import { toTreeString } from "@jywei/to-tree-string";
import { useMemo } from "react";
import { parse } from "yaml";
import styled from "@emotion/styled";
import { CopyIcon } from "@chakra-ui/icons";
import { theme } from "@chakra-ui/theme";

import { FloatingActionButton } from "./FloatingActionButton";
import { useToast } from "@chakra-ui/react";

interface Props {
  yamlString: string;
}

const StyledOutputContainer = styled.div`
  padding: 1rem;
  height: 100%;
  position: relative;
`;

const StyledOutputDisplay = styled.button`
  padding: 1rem;
  background: ${theme.colors.gray[100]};
  border-radius: 4px;
  text-align: left;
  width: 100%;
  &:hover {
    background: ${theme.colors.gray[200]};
    cursor: pointer;
  }
  &:active {
    background: ${theme.colors.gray[300]};
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

  const toast = useToast();

  function copyTreeString() {
    navigator.clipboard
      .writeText(outputStr)
      .then(() => {
        toast({
          title: "Copied",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err: any) =>
        console.error("couldn't copy tree string: " + err.message)
      );
  }

  return (
    <StyledOutputContainer>
      <StyledOutputDisplay onClick={copyTreeString}>
        <pre>{outputStr}</pre>
      </StyledOutputDisplay>

      <FloatingActionButton onClick={copyTreeString}>
        <CopyIcon />
        &nbsp;Copy
      </FloatingActionButton>
    </StyledOutputContainer>
  );
}

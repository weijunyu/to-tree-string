import styled from "@emotion/styled";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { yaml } from "@codemirror/legacy-modes/mode/yaml";

import { FloatingActionButton } from "./FloatingActionButton";

const ExampleYaml = `my-project:
- src:
  - images:
    - image-01.jpg
    - image-02.jpg
  - templates:
    - page.html
    - post.html
  - index.html
- package.json
- README.md`;

const StyledYamlInputContainer = styled.div`
  height: 100%;
  position: relative;
  padding: 1rem;
`;

interface Props {
  onChange(input: string): void;
  value: string;
}

export function YamlInput(props: Props) {
  function onChange(value: string | undefined) {
    props.onChange(value ?? "");
  }

  function loadExample() {
    props.onChange(ExampleYaml);
  }
  return (
    <StyledYamlInputContainer>
      <CodeMirror
        value={props.value}
        onChange={onChange}
        extensions={[StreamLanguage.define(yaml)]}
      />
      <FloatingActionButton onClick={loadExample}>
        Load example
      </FloatingActionButton>
    </StyledYamlInputContainer>
  );
}

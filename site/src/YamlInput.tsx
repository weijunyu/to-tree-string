import styled from "@emotion/styled";
import CodeMirror from "@uiw/react-codemirror";

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

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  font-family: monospace;
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
    // editorRef.current?.setValue(ExampleYaml);
    props.onChange(ExampleYaml);
  }
  return (
    <StyledYamlInputContainer>
      <CodeMirror value={props.value} onChange={onChange} />
      <FloatingActionButton onClick={loadExample}>
        Load example
      </FloatingActionButton>
    </StyledYamlInputContainer>
  );
}

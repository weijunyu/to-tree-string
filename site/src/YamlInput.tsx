import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import styled from "@emotion/styled";
import { FloatingActionButton } from "./FloatingActionButton";
import { useRef } from "react";

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
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  function onEditorMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  function onChange(value: string | undefined) {
    props.onChange(value ?? "");
  }

  function loadExample() {
    // editorRef.current?.setValue(ExampleYaml);
    props.onChange(ExampleYaml);
  }
  return (
    <StyledYamlInputContainer>
      {/* <Editor
        defaultLanguage="yaml"
        options={{
          tabSize: 2,
          minimap: {
            enabled: false,
          },
          scrollBeyondLastLine: false,
        }}
        onChange={onChange}
        onMount={onEditorMount}
      /> */}
      <StyledTextArea
        value={props.value}
        onChange={(e) => onChange(e.target.value)}
      ></StyledTextArea>
      <FloatingActionButton onClick={loadExample}>
        Load example
      </FloatingActionButton>
    </StyledYamlInputContainer>
  );
}

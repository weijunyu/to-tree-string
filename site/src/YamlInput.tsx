import Editor from "@monaco-editor/react";
interface Props {
  onChange(input: string): void;
}
export function YamlInput(props: Props) {
  function onChange(value: string | undefined) {
    props.onChange(value ?? "");
  }
  return (
    <Editor
      defaultLanguage="yaml"
      options={{
        minimap: {
          enabled: false,
        },
      }}
      onChange={onChange}
    />
  );
}

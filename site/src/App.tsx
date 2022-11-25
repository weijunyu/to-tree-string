import { useCallback, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { YamlInput } from "./YamlInput";
import { TreeStringOutput } from "./TreeStringOutput";
import { ExampleYaml } from "./constants";

const StyledTabs = styled(Tabs)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledTabPanels = styled(TabPanels)`
  flex: 1 1 auto;
`;

const StyledTabPanel = styled(TabPanel)`
  padding: 0;
  height: 100%;
`;

function App() {
  const [input, setInput] = useState(ExampleYaml);
  const [inputToTransform, setInputToTransform] = useState("");

  const onDisplayTreeString = useCallback(() => {
    setInputToTransform(input);
  }, [input]);

  return (
    <main style={{ height: "100vh" }}>
      <StyledTabs isFitted>
        <StyledTabPanels>
          <StyledTabPanel>
            <YamlInput
              value={input}
              onChange={(input: string) => setInput(input)}
            />
          </StyledTabPanel>
          <StyledTabPanel>
            <TreeStringOutput yamlString={inputToTransform} />
          </StyledTabPanel>
        </StyledTabPanels>

        <TabList>
          <Tab>YAML</Tab>
          <Tab onClick={onDisplayTreeString}>Tree String</Tab>
        </TabList>
      </StyledTabs>
    </main>
  );
}

export default App;

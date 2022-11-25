import { Button, ButtonProps } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const FloatingActionButton = styled((props: ButtonProps) => (
  <Button size="xs" {...props} />
))`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`;

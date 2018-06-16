import styled from 'react-emotion';

export const Pane = styled('div')`
  width: 50%;
  height: 100vh;
  padding: 2rem;
  background-color: ${props => props.backgroundColor};
`;

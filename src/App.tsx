import styled, { ThemeProvider } from 'styled-components'
import DragGroup from './components/Drag/DragGroup';
import List from './components/List/List';

const StyledApp = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${props => props.theme.background};
  padding: 0.5em;
`

const theme = {
  primary: "#2c2b30",
  accent: "#7c7ef5",
  background: "#feffff",
  roundness: "0.25rem",
} as const;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <DragGroup>
          <List name={"For today"}/>
          <List name={"For tomorrow"}/>
        </DragGroup>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;

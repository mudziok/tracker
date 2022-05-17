import styled, { ThemeProvider } from 'styled-components'
import DragGroup from './contexts/Drag/DragGroup';
import List from './components/List/List';

const StyledApp = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${props => props.theme.background};
  padding: 0.5em;
`;

const ListsContainer = styled.div`
  display: flex;
`;

const theme = {
  primary: "#2c2b30",
  accent: "#7c7ef5",
  background: "#feffff",
  roundness: "0.25rem",
} as const;

const App = () => {
  const mockTask = {id: 1, name: "Mock name", description: "Mock description"};
  const mockTask2 = {id: 2, name: "Mock name 2", description: "Mock description 2"};
  const mockTasks = [mockTask, mockTask2];

  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <DragGroup>
          <ListsContainer>
            <List name={"For today"} tasks={mockTasks}/>
            <List name={"For tomorrow"} tasks={mockTasks}/>
          </ListsContainer>
        </DragGroup>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;

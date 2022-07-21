import styled, { ThemeProvider } from 'styled-components'
import DragGroup from './contexts/Drag/DragGroup';
import ListDisplay from './components/List/ListDisplay';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { Add, DarkMode, Undo, Trash } from './components/Toolbar';

const StyledApp = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.primary};
  padding: 0.5em;
  overflow: auto;
  
  transition-duration: 0.1s;
  transition-property: background-color, color;
  * {
    transition-duration: 0.1s;
    transition-property: background-color, color;
  }

  * ::selection {
    color: ${props => props.theme.background};
    background: ${props => props.theme.accent};
  }
`;

const ListsContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ToolbarStack = styled.div`
  display: flex;
  flex-direction: column;

  div, button {
    aspect-ratio: 1;
  }
`

const theme = {
  primary: "#1e1e1e",
  accent: "#7c7ef5",
  background: "#feffff",
  roundness: "0.25rem",
} as const;

const darkTheme = {
  ...theme,
  primary: theme.background,
  background: theme.primary,
} as const;

const App = () => {
  const darkMode = useSelector<RootState>((state) => state.theme.darkMode);
  const lists = useSelector((state: RootState) => state.tracker.present.lists);

  const listDisplays = lists.map(list => <ListDisplay key={list.id} {...list} />);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <StyledApp>
        <DragGroup>
          <ListsContainer>
            <ToolbarStack>
              <Add />
              <Undo />
              <DarkMode />
              <Trash />
            </ToolbarStack>
            {listDisplays}
          </ListsContainer>
        </DragGroup>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;

import styled, { ThemeProvider } from 'styled-components';
import DragGroup from 'contexts/Drag/DragGroup';
import ListDisplay from 'components/List/ListDisplay';
import { useSelector } from 'react-redux';
import { Add, DarkMode, Undo, Trash, ChangeTheme } from 'components/Toolbar';
import { selectDarkMode, selectTheme } from 'redux/theme/themeSlice';
import { selectLists } from 'redux/tracker/trackerSlice';

const StyledApp = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.primary};
  padding: 0.5em;
  overflow: auto;

  user-select: none;
  * ::selection {
    color: ${(props) => props.theme.background};
    background: ${(props) => props.theme.accent};
  }
`;

const ListsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5em;
`;

const ToolbarStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  div,
  button {
    aspect-ratio: 1;
  }
`;

const App = () => {
  const lists = useSelector(selectLists);
  const darkMode = useSelector(selectDarkMode);
  const theme = useSelector(selectTheme);

  const listDisplays = lists.map((list) => (
    <ListDisplay key={list.id} {...list} />
  ));

  const darkTheme = {
    ...theme,
    primary: theme.background,
    background: theme.primary,
  } as const;

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <StyledApp>
        <DragGroup>
          <ListsContainer>
            <ToolbarStack>
              <Undo />
              <DarkMode />
              <ChangeTheme />
            </ToolbarStack>
            {listDisplays}
            <ToolbarStack>
              <Add />
              <Trash />
            </ToolbarStack>
          </ListsContainer>
        </DragGroup>
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;

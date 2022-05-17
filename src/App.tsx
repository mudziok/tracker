import styled, { ThemeProvider } from 'styled-components'
import DragGroup from './contexts/Drag/DragGroup';
import ListDisplay from './components/List/ListDisplay';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import ListAdd from './components/List/ListAdd';

const StyledApp = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.primary};
  padding: 0.5em;
  overflow: auto;
`;

const ListsContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const theme = {
  primary: "#1e1e1e",
  accent: "#7c7ef5",
  background: "#feffff",
  roundness: "0.25rem",
} as const;

const App = () => {
  const lists = useSelector((state: RootState) => state.tracker.lists);

  const listDisplays = lists.map(list => <ListDisplay key={list.id} {...list} />);

  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <DragGroup>
          <ListsContainer>
            {listDisplays}
            <ListAdd />
          </ListsContainer>
        </DragGroup>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;

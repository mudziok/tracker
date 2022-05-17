import styled, { ThemeProvider } from 'styled-components'
import DragGroup from './contexts/Drag/DragGroup';
import ListDisplay from './components/List/ListDisplay';
import { useSelector } from 'react-redux';
import { RootState } from './store';

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
  const lists = useSelector((state: RootState) => state.tracker.lists);

  const listDisplays = lists.map(list => <ListDisplay key={list.id} {...list} />);

  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <DragGroup>
          <ListsContainer>
            {listDisplays}
          </ListsContainer>
        </DragGroup>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;

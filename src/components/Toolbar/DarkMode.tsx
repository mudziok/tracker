import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';
import Card from 'components/Card';
import { FaMoon, FaSun } from 'react-icons/fa';
import { selectIsDarkMode, setDarkMode } from 'redux/theme/themeSlice';

export const DarkMode: FC = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectIsDarkMode);

  const toggleDarkMode = () => dispatch(setDarkMode(!darkMode));

  return (
    <Card>
      <Button fontSize="lg" buttonSize="full" onClick={toggleDarkMode}>
        {darkMode ? <FaMoon /> : <FaSun />}
      </Button>
    </Card>
  );
};

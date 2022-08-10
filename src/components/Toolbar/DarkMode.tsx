import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/Button";
import Card from "components/Card";
import { FaMoon, FaSun } from "react-icons/fa";
import { selectDarkMode, setDarkMode } from "redux/theme/themeSlice";

export const DarkMode: FC = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  const toggleDarkMode = () => dispatch(setDarkMode(!darkMode));

  return (
    <Card>
      <Button fontSize="lg" buttonSize="full" onClick={toggleDarkMode}>
        {darkMode ? <FaMoon /> : <FaSun />}
      </Button>
    </Card>
  );
};

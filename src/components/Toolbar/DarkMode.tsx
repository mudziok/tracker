import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import Card from "../Card/Card";
import { FaMoon, FaSun } from "react-icons/fa"
import { RootState } from "../../store";
import { setDarkMode } from "../../features/theme/themeSlice";

export const DarkMode:FC = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector<RootState>((state) => state.theme.darkMode);

  const toggleDarkMode = () => dispatch(setDarkMode(!darkMode));

  return (
    <Card>
      <Button fontSize="lg" buttonSize="full" onClick={toggleDarkMode}>
        {darkMode ? <FaMoon /> : <FaSun/>}
      </Button>
    </Card>
  );
}
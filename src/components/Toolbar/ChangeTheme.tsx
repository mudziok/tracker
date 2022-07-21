import { FC } from "react";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import Card from "../Card/Card";
import { FaPaintBrush } from "react-icons/fa"
import { nextTheme } from "../../features/theme/themeSlice";

export const ChangeTheme:FC = () => {
  const dispatch = useDispatch();

  const changeTheme = () => dispatch(nextTheme());

  return (
    <Card>
      <Button fontSize="lg" buttonSize="full" onClick={changeTheme}><FaPaintBrush /></Button>
    </Card>
  );
}
import { FC } from "react";
import { useDispatch } from "react-redux";
import Card from "components/Card";
import { FaPaintBrush } from "react-icons/fa";
import { nextTheme } from "redux/theme/themeSlice";
import Button from "components/Button";

export const ChangeTheme: FC = () => {
  const dispatch = useDispatch();

  return (
    <Card>
      <Button
        fontSize="lg"
        buttonSize="full"
        onClick={() => dispatch(nextTheme())}
      >
        <FaPaintBrush />
      </Button>
    </Card>
  );
};

import { FC } from "react";
import { useDispatch } from "react-redux";
import { undo } from "../../features/tracker/trackerSlice";
import Button from "../Button/Button";
import Card from "../Card/Card";
import { FaUndo } from "react-icons/fa"

const ListUndo:FC = () => {
  const dispatch = useDispatch();

  const undoLastAction = () => dispatch(undo());

  return (
    <Card>
      <Button fontSize="lg" buttonSize="full" onClick={undoLastAction}><FaUndo /></Button>
    </Card>
  );
}

export default ListUndo;
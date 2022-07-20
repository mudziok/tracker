import { FC } from "react";
import { useDispatch } from "react-redux";
import { undo } from "../../features/tracker/trackerSlice";
import Button from "../Button/Button";
import { ListCard } from "./ListDisplay"

const ListUndo:FC = () => {
  const dispatch = useDispatch();

  const undoLastAction = () => dispatch(undo());

  return (
    <ListCard>
      <Button fontSize="lg" buttonSize="full" onClick={undoLastAction}>Undo</Button>
    </ListCard>
  );
}

export default ListUndo;
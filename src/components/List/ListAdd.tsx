import { FC } from "react";
import Button from "../Button/Button";
import { ListCard } from "./ListDisplay"

const ListAdd:FC = () => {
  return (
    <ListCard>
      <Button fontSize="lg" buttonSize="full">New List +</Button>
    </ListCard>
  );
}

export default ListAdd;
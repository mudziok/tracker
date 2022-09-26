import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';
import Card from 'components/Card';
import { FaExpand, FaCompress } from 'react-icons/fa';
import { selectIsCollapsed, setIsCollapsed } from 'redux/theme/themeSlice';

export const Collapse: FC = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector(selectIsCollapsed);

  const toggleDarkMode = () => dispatch(setIsCollapsed(!isCollapsed));

  return (
    <Card>
      <Button fontSize="lg" buttonSize="full" onClick={toggleDarkMode}>
        {isCollapsed ? <FaExpand /> : <FaCompress />}
      </Button>
    </Card>
  );
};

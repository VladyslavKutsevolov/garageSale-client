import React from 'react';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

interface ICategory {
  categoryName: string;
  selected: boolean;
  setCategory(): void;
}

const Category: React.FC<ICategory> = ({
  categoryName,
  selected,
  setCategory
}) => {
  const isSelected: any = selected ? <DoneIcon /> : null;
  return (
    <Chip
      onClick={setCategory}
      icon={isSelected}
      label={categoryName}
      variant="outlined"
      clickable
      color="primary"
    />
  );
};

export default Category;

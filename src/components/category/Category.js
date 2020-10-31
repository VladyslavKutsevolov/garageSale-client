/* eslint-disable react/prop-types */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

const Category = ({ categoryName, selected, setCategory }) => {
  const isSelected = selected ? <DoneIcon /> : null;
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

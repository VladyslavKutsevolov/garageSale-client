import React from 'react';
import PropTypes from 'prop-types';
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

Category.propTypes = {
  categoryName: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  setCategory: PropTypes.func.isRequired
};

export default Category;

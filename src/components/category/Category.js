/* eslint-disable react/prop-types */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

const Category = ({ categoryName, selected, setCategory }) => (
  <Chip
    onClick={setCategory}
    icon={selected && <DoneIcon />}
    label={categoryName}
    variant="outlined"
    clickable
    color="primary"
  />
);

export default Category;

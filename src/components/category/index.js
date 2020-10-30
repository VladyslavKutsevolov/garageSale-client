/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Category from './Category';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  }
}));

const CategoryList = ({ categories }) => {
  const [categoryId, setCategoryId] = useState(0);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {categories &&
        categories.map(category => (
          <Category
            key={category.name}
            categoryName={category.name}
            setCategory={() => setCategoryId(category.id)}
            selected={category.id === categoryId}
          />
        ))}
    </div>
  );
};

export default CategoryList;

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
  const [categoryId, setCategoryId] = useState(null);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Category categoryName="All" />
      {categories.map(category => (
        <Category
          key={category.id}
          categoryName={category.name}
          setCategory={() => setCategoryId(category.id)}
          selected={category.id === categoryId}
        />
      ))}
    </div>
  );
};

export default CategoryList;

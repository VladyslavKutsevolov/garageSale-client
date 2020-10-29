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
const fakeCategoryList = [
  { name: 'Footwear', id: 1 },
  { name: 'Watches', id: 2 },
  { name: 'jewelry', id: 3 },
  { name: 'Handbags', id: 4 },
  { name: 'wallets', id: 5 },
  { name: 'electronics', id: 6 },
  { name: 'products', id: 7 },
  { name: 'products', id: 8 },
  { name: 'products', id: 9 },
  { name: 'products', id: 10 }
];
const CategoryList = ({ categories }) => {
  const [categoryId, setCategoryId] = useState(0);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {fakeCategoryList.map(category => (
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

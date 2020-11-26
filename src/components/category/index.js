import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Category from './Category';
import { useStateData } from '../../context/appContext';

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
  const { getProductsForCategory, saleId } = useStateData();

  const [categoryId, setCategoryId] = useState(0);
  const classes = useStyles();

  const getCategoryInfo = (idCategory, name) => {
    getProductsForCategory(name, saleId);
    setCategoryId(idCategory);
  };

  return (
    <div className={classes.root}>
      {categories &&
        categories.map(category => (
          <Category
            key={category.name}
            categoryName={category.name}
            setCategory={() =>
              getCategoryInfo(category.category_id, category.name)
            }
            selected={category.category_id === categoryId}
          />
        ))}
    </div>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired
};

export default CategoryList;

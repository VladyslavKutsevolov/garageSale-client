/* eslint-disable react/prop-types */
import { CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  media: {
    width: '30rem',
    height: '20rem'
  },
  boxStyle: {
    boxShadow: '4px 6px 15px -6px rgba(0,0,0,0.5)',
    width: '30rem',
    marginTop: '2rem',
    flexBasis: '45%',
    position: 'fixed'
  }
});

const SaleInfo = ({ saleImg, title, description }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.boxStyle}>
        <CardMedia className={classes.media} image={saleImg} />
        <Typography component="h5" variant="h5">
          {title}
        </Typography>
        <Typography component="p" variant="subtitle1">
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default SaleInfo;

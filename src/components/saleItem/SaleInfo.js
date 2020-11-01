/* eslint-disable react/prop-types */
import { CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  media: {
    width: '40rem',
    height: '20rem',
    marginBottom: '1rem'
  },
  boxStyle: {
    boxShadow: '4px 6px 15px -6px rgba(0,0,0,0.5)',
    borderRadius: '4px',
    maxWidth: '40rem',
    marginTop: '2rem',
    flexBasis: '45%',
    justifyContent: 'center',
    paddingBottom: '1rem'
  },
  title: {
    textAlign: 'center'
  },
  city: {
    textAlign: 'center',
    marginTop: '.5rem',
    marginBottom: '.5rem'
  },
  description: {
    textAlign: 'center',
    color: '#444'
  }
});

const SaleInfo = ({ saleImg, title, description, city, province }) => {
  const classes = useStyles();
  return (
    <div className={classes.boxStyle}>
      <CardMedia className={classes.media} image={saleImg} />
      <div className={classes.title}>
        <Typography component="h4" variant="h5">
          {title}
        </Typography>
      </div>
      <div className={classes.city}>
        <Typography variant="body1" component="span">
          <strong>Location:</strong>
          {city}
          {', '}
          {province}
        </Typography>
      </div>
      <div className={classes.description}>
        <Typography component="p" variant="subtitle1">
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default SaleInfo;

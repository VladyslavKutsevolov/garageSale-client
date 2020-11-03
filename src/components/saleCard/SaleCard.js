/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './styles.scss';


const useStyles = makeStyles({
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
  },
  time: {
    textAlign: 'right'
  }
});

const SaleCard = ({
  selectSale,
  title,
  description,
  cover_photo_url,
  city,
  province,
  daysAgo
}) => {
  const classes = useStyles();


  return (
    <>
      <Link to="/products">
        <div className="img-card-wrapper" onClick={selectSale}>
          <img src={cover_photo_url} alt="garage" />
        </div>
      </Link>
      <div className="sale-card__info-position">
        <div className="sale-card__info">
          <div className={classes.title}>
            <Typography variant="h4" component="h5">
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
            <Typography variant="subtitle2" component="p">
              {description}
            </Typography>
          </div>
          <div className={classes.time}>
            <Typography variant="subtitle1" component="span">
              {daysAgo}
            </Typography>
          </div>

        </div>
      </div>
    </>
  );
};

export default SaleCard;

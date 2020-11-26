/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useSpring, animated } from 'react-spring';
import { saleCardStyles } from './styles';
import './styles.scss';

// Animation
const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 800,
  (x - window.innerWidth / 2) / 800,
  1.1
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const SaleCard = ({
  selectSale,
  title,
  description,
  cover_photo_url,
  city,
  province,
  daysAgo
}) => {
  const classes = saleCardStyles();
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 500, friction: 300 }
  }));

  return (
    <>
      <animated.div
        className="card"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        // eslint-disable-next-line react/prop-types
        style={{ transform: props.xys.interpolate(trans) }}
      >
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
      </animated.div>
    </>
  );
};

SaleCard.propTypes = {
  selectSale: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cover_photo_url: PropTypes.string.isRequired,
  province: PropTypes.string.isRequired,
  daysAgo: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired
};

export default SaleCard;

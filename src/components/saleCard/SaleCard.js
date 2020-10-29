/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const SaleCard = ({
  selectSale,
  title,
  description,
  cover_photo_url,
  city,
  province
}) => (
  <>
    <Link to="/products">
      <div className="img-card-wrapper" onClick={selectSale}>
        <img src={cover_photo_url} alt="garage" />
      </div>
    </Link>
    <div className="sale-card__info-position">
      <div className="sale-card__info">
        <h4>{title}</h4>
        <p>
          <strong>Location:</strong>
          {city}
          {', '}
          {province}
        </p>
        <p>{description}</p>
      </div>
    </div>
  </>
);

export default SaleCard;

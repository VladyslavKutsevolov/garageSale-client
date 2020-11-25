/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { CardMedia, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { saleInfoStyles } from './styles';
import { useStateData } from '../../context/appContext';

const SaleInfo = ({
  saleImg,
  title,
  description,
  handleOpenDelete,
  handleOpenEdit,
  city,
  province,
  seller_id
}) => {
  const classes = saleInfoStyles();
  const { state, noHidden, setNoHidden } = useStateData();

  // Activate Edit/Delete button for seller
  useEffect(() => {
    if (seller_id === state.loginUser.id) {
      setNoHidden(true);
    } else {
      setNoHidden(false);
    }
  }, [state]);

  return (
    <div className={classes.boxStyle}>
      <CardMedia className={classes.media} image={saleImg} />
      <div className={classes.title}>
        <Typography component="h4" variant="h5">
          {title}
        </Typography>
        {noHidden && (
          <Typography>
            <ListItemIcon>
              <EditIcon className={classes.actions} onClick={handleOpenEdit} />
              <DeleteIcon
                className={classes.actions}
                onClick={handleOpenDelete}
                data-testid="delete-garage"
              />
            </ListItemIcon>
          </Typography>
        )}
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

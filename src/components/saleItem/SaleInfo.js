/* eslint-disable react/prop-types */
import { CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  media: {
    width: '40rem',
    height: '20rem'
  },
  boxStyle: {
    boxShadow: '4px 6px 15px -6px rgba(0,0,0,0.5)',
    maxWidth: '40rem',
    marginTop: '2rem',
    flexBasis: '45%',
    justifyContent: 'center'
  }
}));

const SaleInfo = ({ saleImg, title, description, handleOpenDelete, handleOpenEdit }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.boxStyle}>
        <CardMedia className={classes.media} image={saleImg} />
        <Typography component="h5" variant="h5">
          {title}
        </Typography>
        <Typography>
          <ListItemIcon>
            <EditIcon onClick={handleOpenEdit} />
            <DeleteIcon onClick={handleOpenDelete} />
          </ListItemIcon>
        </Typography>
        <Typography component="p" variant="subtitle1">
          {description}
        </Typography>
      </div>
    </>
  );
};

export default SaleInfo;

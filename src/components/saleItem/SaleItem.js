/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardHeader from '@material-ui/core/CardHeader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import SaleItemEdit from './SaleItemEdit';

import CommentContainer from '../comments/CommentContainer';
import CardDropDown from './DropDownBox';
import { useStateData } from '../../context/appContext';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: '4px 13px 20px -6px rgba(0,0,0,0.15)',
    minWidth: '45rem',
    marginBottom: '2rem',
    transition: 'all, 2s, ease-out',
    '&:hover': {
      boxShadow: '4px 13px 20px -6px rgba(0,0,0,0.45)'
    }
  },
  cardContentRoot: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    marginLeft: '1rem',
    marginRight: '1rem'
  },
  actionButtons: {
    display: 'flex',
    marginTop: '1rem'
  },
  buttonCustomStyle: {
    background:
      'linear-gradient(135deg, rgba(164,66,255,1) 0%, rgba(68,17,187,1) 39%, rgba(38,70,227,1) 69%, rgba(38,70,227,1) 88%)',
    color: '#fff'
  },
  soldOutButton: {
    background:
      'linear-gradient(135deg, rgba(160,166,10,1) 0%, rgba(200,117,87,1) 39%, rgba(200,70,27,1) 69%, rgba(255,70,27,1) 88%)',
    color: '#fff'
  },
  details: {
    display: 'flex',
    alignItems: 'center'
  },
  cover: {
    width: '25rem',
    height: '15rem'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  title: {
    padding: 0
  },
  actions: {
    cursor: 'pointer',
    '&:hover': {
      color: '#0066ff'
    }
  }
}));

export default function SaleItem({
  id,
  imageUrl,
  title,
  price,
  productSummary,
  setItemId,
  sold,
  getProductId
}) {
  const { state, deleteProduct, setProductId, noHidden, showMessage } = useStateData();
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // Handle Buy Button
  const getProductInfo = () => {
    if (state.loginUser.username) {
      // Save the item id on state inside global scope
      setProductId(id);
      // Trigger for open/close buy button
      setItemId(id);
    } else {
      showMessage('Please Login First!');
    }
  };

  // Handles chevron for product_summary
  const handleExpandClick = () => {
    getProductId();
    setExpanded(!expanded);
  };

  // Handle Delete dialog
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const deleteItem = productId => {
    deleteProduct(productId);
    handleCloseDelete();
  };

  // Handle Edit
  const handleOpenEdit = () => {
    setProductId(id);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContentRoot}>
        <div className={classes.details}>
          <CardMedia className={classes.cover} image={imageUrl} />
          <div className={classes.productInfo}>
            <div>
              <CardHeader className={classes.title} title={title} />
              <div>
                {noHidden && (
                  <ListItemIcon>
                    <EditIcon
                      className={classes.actions}
                      onClick={handleOpenEdit}
                    />
                    <DeleteIcon
                      className={classes.actions}
                      onClick={handleOpenDelete}
                    />
                  </ListItemIcon>
                )}

                <SaleItemEdit
                  open={openEdit}
                  handleClose={handleCloseEdit}
                  productId={id}
                  title={title}
                  price={price}
                  sold={sold}
                  imageUrl={imageUrl}
                  productSummary={productSummary}
                />

                <Dialog
                  open={openDelete}
                  onClose={handleCloseDelete}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure want to delete this product?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => deleteItem(id)}
                      color="primary"
                      autoFocus
                    >
                      YES
                    </Button>
                    <Button onClick={handleCloseDelete} color="primary">
                      NO
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>

            <div>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Price: </strong>
                {`$${price}`}
              </Typography>
            </div>
            <div className={classes.actionButtons}>
              {sold ? (
                <Button
                  variant="contained"
                  className={classes.soldOutButton}
                  onClick={() => showMessage('Sorry Sold Out')}
                >
                  SALE PENDING
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={classes.buttonCustomStyle}
                  onClick={getProductInfo}
                >
                  I'LL BUY IT!
                </Button>
              )}
              <CardActions disableSpacing>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  Details
                  <ExpandMoreIcon
                    className={classNames(classes.expand, {
                      [classes.expandOpen]: expanded
                    })}
                  />
                </Button>
              </CardActions>
            </div>
          </div>
        </div>
      </CardContent>

      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        onClick={getProductId}
      >
        <CardContent>
          <CardDropDown
            comments={<CommentContainer />}
            description={productSummary}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}

import React, { FC, useState } from 'react';
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

import CardDropDown from './DropDownBox';
import { useStateData } from '../../context/appContext';
import { saleItem } from './styles';

interface ISaleItem {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
  productSummary: string;
  setItemId(id: number): void;
  sold: boolean;
  getProductId(): void;
}

const SaleItem: FC<ISaleItem> = ({
  id,
  imageUrl,
  title,
  price,
  productSummary,
  setItemId,
  sold,
  getProductId
}) => {
  const {
    state,
    deleteProduct,
    setProductId,
    noHidden,
    showMessage
  } = useStateData();
  const classes = saleItem();

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

  const deleteItem = (productId: number) => {
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
              <CardHeader
                className={classes.title}
                title={title}
                data-testid="item-title"
              />
              <div>
                {noHidden && (
                  <ListItemIcon>
                    <EditIcon
                      className={classes.actions}
                      onClick={handleOpenEdit}
                    />
                    <DeleteIcon
                      data-testid="delete-item"
                      className={classes.actions}
                      onClick={handleOpenDelete}
                    />
                  </ListItemIcon>
                )}

                <SaleItemEdit
                  open={openEdit}
                  handleClose={handleCloseEdit}
                  // productId={id}
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
                  I&apos;LL BUY IT!
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

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CardDropDown description={productSummary} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default SaleItem;

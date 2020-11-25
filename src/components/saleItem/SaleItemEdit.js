/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Fab, Button, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useStateData } from '../../context/appContext';
import { saleItemEditStyles } from './styles';

const rand = () => Math.round(Math.random() * 20) - 10;

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

const SaleItemEdit = props => {
  const initialState = {
    title: props.title,
    description: props.productSummary,
    price: props.price,
    image_url: props.imageUrl,
    sold: props.sold
  };
  const classes = saleItemEditStyles();
  const [form, setForm] = useState(initialState);
  const [productImg, setProductImg] = useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [fileName, setFileName] = useState('');
  const { editProduct, productId } = useStateData();

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value
    });
  };

  const getImg = ({ target }) => {
    setProductImg(target.files[0]);
    setFileName(target.files[0].name);
  };
  const clearInputFields = () => {
    setForm(initialState);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('productImg', productImg);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('sold', form.sold);

    editProduct(productId, formData);
    clearInputFields();
    props.handleClose();
  };

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Edit Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={handleChange}
              name="title"
              placeholder={props.title}
              label="Product Title"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              name="description"
              placeholder={props.productSummary}
              label="Product Description"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              name="price"
              placeholder={props.price}
              label="Product Price"
              fullWidth
            />
            <div className={classes.upload}>
              <label htmlFor="product-img">
                <div className={classes.uploadButtonControl}>
                  <Fab
                    color="secondary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                  >
                    <AddIcon />
                    Upload photo
                  </Fab>
                  <p className={classes.filename}>{fileName}</p>
                </div>
                <input
                  id="product-img"
                  name="product-img"
                  type="file"
                  onChange={getImg}
                  placeholder={props.imageUrl}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div className={classes.actionButtons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.submitButton}
                type="submit"
              >
                Edit Product
              </Button>
              <Button
                onClick={props.handleClose}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SaleItemEdit;

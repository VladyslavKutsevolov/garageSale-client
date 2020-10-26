import React, { useState } from 'react';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Fab, Button, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const rand = () => Math.round(Math.random() * 20) - 10;

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  actionButtons: {
    display: 'flex',
    marginTop: '1.2rem',
    justifyContent: 'center'
  },
  submitButton: {
    marginRight: '.5rem'
  },
  upload: {
    marginTop: '1.2rem'
  }
}));

const initialState = {
  title: '',
  description: '',
  price: ''
};

const SaleItemForm = () => {
  const classes = useStyles();
  const [form, setForm] = useState(initialState);
  const [productImg, setProductImg] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value
    });
  };

  const getImg = ({ target }) => {
    setProductImg(target.files[0]);
  };
  const clearInputFields = () => {
    setForm(initialState);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('productImg', productImg);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);

    axios.post('/products/new', formData);
    clearInputFields();
    handleClose();
  };

  return (
    <>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Product Information
          </Typography>
          <form onSubmit={handleSubmit} action="/product/new" method="POST">
            <TextField
              onChange={handleChange}
              required
              name="title"
              label="Product Title"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              name="description"
              label="Product Description"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              name="price"
              label="Product Price"
              fullWidth
            />
            <div className={classes.upload}>
              <label htmlFor="product-img">
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
                <input
                  id="product-img"
                  name="product-img"
                  type="file"
                  onChange={getImg}
                  // style={{ display: 'none' }}
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
                Create Product
              </Button>
              <Button variant="outlined" color="secondary">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SaleItemForm;

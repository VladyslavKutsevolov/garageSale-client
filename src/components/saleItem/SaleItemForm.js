/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  Fab,
  Button,
  Modal,
  Select,
  FormControl,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useStateData } from '../../context/appContext';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  submitButton: {
    marginRight: '.5rem'
  },
  upload: {
    marginTop: '1.2rem'
  },
  uploadButtonControl: {
    display: 'flex',
    alignItems: 'center'
  },
  filename: {
    marginLeft: '1rem'
  }
}));

const initialState = {
  title: '',
  description: '',
  price: '',
  categoryName: ''
};

const SaleItemForm = ({ handleClose, open }) => {
  const classes = useStyles();
  const [form, setForm] = useState(initialState);
  const [productImg, setProductImg] = useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [fileName, setFileName] = useState('');
  const { createProduct, saleId } = useStateData();

  const handleChange = ({ target }) => {
    console.log(target.value);
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
    formData.append('categoryName', form.categoryName);
    formData.append('sale_id', saleId);

    createProduct(formData);
    clearInputFields();
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Create Product for Sale
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
            <FormControl className={classes.formControl}>
              <InputLabel id="select-category">Category</InputLabel>
              <Select
                labelId="select-category"
                id="select-category"
                name="categoryName"
                value={form.categoryName}
                onChange={handleChange}
                autoWidth
              >
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Furniture">Furniture</MenuItem>
                <MenuItem value="Apparels">Apparels</MenuItem>
                <MenuItem value="Books">Books</MenuItem>
                <MenuItem value="Toys">Toys</MenuItem>
                <MenuItem value="Media">Media</MenuItem>
                <MenuItem value="Appliances">Appliances</MenuItem>
                <MenuItem value="Clothes">Clothes</MenuItem>
                <MenuItem value="Tools">Tools</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
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
                Create Product
              </Button>
              <Button
                onClick={handleClose}
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

export default SaleItemForm;

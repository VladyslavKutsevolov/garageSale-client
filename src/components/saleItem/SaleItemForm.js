/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import Typography from '@material-ui/core/Typography';
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
import { saleItemFromStyles } from './styles';
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

const initialState = {
  title: '',
  description: '',
  price: '',
  categoryName: ''
};

const SaleItemForm = ({ handleClose, open }) => {
  const classes = saleItemFromStyles();
  const [form, setForm] = useState(initialState);
  const [productImg, setProductImg] = useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [fileName, setFileName] = useState('');
  const { createProduct, saleId, state } = useStateData();
  const [errorMsg, setErrorMsg] = useState({});
  const [formValid, setFormValid] = useState(true);
  const [imgValid, setImgValid] = useState(true);
  const [imgError, setImgError] = useState('');

  const validation = () => {
    const errors = {};
    let formIsValid = true;

    // Name of Product
    if (form.title.length > 20) {
      formIsValid = false;
      errors.title = 'Too long Name!';
    }

    if (form.title.length > 0) {
      if (!form.title.match(/^[a-zA-Z0-9" "]+$/)) {
        formIsValid = false;
        errors.title = 'No special Characters!';
      }
    }

    // Description Length
    if (form.description.length > 100) {
      formIsValid = false;
      errors.description = 'Text cannot be more than 100 letters.';
    }

    // Price can only be number
    if (form.price.length > 0) {
      if (
        !form.price.match(
          /^(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?$/
        )
      ) {
        formIsValid = false;
        errors.price = 'Only Number for Price';
      }
    }

    setErrorMsg({ errors });
    setFormValid(formIsValid);
  };

  useEffect(() => {
    validation();
  }, [form]);

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value
    });
  };

  const getImg = ({ target }) => {
    setImgValid(true);
    setImgError('');
    const uploadFile = target.files[0].type.split('/');
    if (uploadFile[0] !== 'image') {
      setImgValid(false);
      setImgError('Sorry, only JPG, JPEG, PNG & GIF files are allowed.');
    }
    setProductImg(target.files[0]);
    setFileName(target.files[0].name);
  };
  const clearInputFields = () => {
    setForm(initialState);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (formValid && imgValid) {
      const formData = new FormData();

      formData.append('seller_id', state.loginUser.id);
      formData.append('productImg', productImg);
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('categoryName', form.categoryName);
      formData.append('sale_id', saleId);

      createProduct(formData);
      clearInputFields();
      handleClose();
    } else {
      alert('Unvalid inputs!');
    }
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
            <section className={classes.validationStyle}>
              {!formValid && errorMsg.errors.title}
            </section>
            <TextField
              onChange={handleChange}
              name="description"
              label="Product Description"
              fullWidth
            />
            <section className={classes.validationStyle}>
              {!formValid && errorMsg.errors.description}
            </section>
            <TextField
              onChange={handleChange}
              name="price"
              label="Product Price"
              fullWidth
            />
            <section className={classes.validationStyle}>
              {!formValid && errorMsg.errors.price}
            </section>
            <FormControl className={classes.formControl}>
              <InputLabel id="select-category">Category</InputLabel>
              <Select
                labelId="select-category"
                id="select-category"
                name="categoryName"
                value={form.categoryName}
                onChange={handleChange}
                required
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
              <section className={classes.validationStyle}>
                {!formValid && errorMsg.errors.categoryName}
              </section>
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
              <section className={classes.validationStyle}>
                {!imgValid && imgError}
              </section>
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

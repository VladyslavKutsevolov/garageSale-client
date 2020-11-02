/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Fab, Button, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useStateData } from '../../context/appContext';

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
  },
  uploadButtonControl: {
    display: 'flex',
    alignItems: 'center'
  },
  filename: {
    marginLeft: '1rem'
  },
  validationStyle: {
    color: 'red'
  }
}));

const initialState = {
  title: '',
  description: '',
  price: ''
};

const SaleItemForm = ({ handleClose, open }) => {
  const classes = useStyles();
  const [form, setForm] = useState(initialState);
  const [productImg, setProductImg] = useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [fileName, setFileName] = useState('');
  const { createProduct, saleId } = useStateData();
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

      formData.append('productImg', productImg);
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', form.price);
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

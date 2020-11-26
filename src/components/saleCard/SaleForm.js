import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {
  Fab,
  Button,
  Modal,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { saleFormStyles } from './styles';

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
  city: '',
  province: ''
};

const SaleForm = ({ handleClose, open }) => {
  const classes = saleFormStyles();
  const { createSale, state } = useStateData();
  const [form, setForm] = useState(initialState);
  const [saleImg, setSaleImg] = useState(null);
  const [modalStyle] = useState(getModalStyle);
  const [fileName, setFileName] = useState('');
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

    // City
    if (form.city.length > 0) {
      if (!form.city.match(/^[a-zA-Z" "]+$/)) {
        formIsValid = false;
        errors.city = 'Please enter valid city name!';
      }
    }

    // Description Length
    if (form.description.length > 60) {
      formIsValid = false;
      errors.description = 'Text cannot be more than 60 letters.';
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
    setSaleImg(target.files[0]);
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
      formData.append('saleImg', saleImg);
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('city', form.city);
      formData.append('province', form.province);

      createSale(formData);
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
            Create Garage Sale
          </Typography>
          <form onSubmit={handleSubmit} action="/product/new" method="POST">
            <TextField
              onChange={handleChange}
              value={form.title}
              required
              name="title"
              label="Title"
              fullWidth
            />
            <section className={classes.validationStyle}>
              {!formValid && errorMsg.errors.title}
            </section>
            <TextField
              onChange={handleChange}
              value={form.description}
              name="description"
              label="Description"
              fullWidth
            />
            <section className={classes.validationStyle}>
              {!formValid && errorMsg.errors.description}
            </section>
            <TextField
              onChange={handleChange}
              value={form.city}
              required
              name="city"
              label="City"
              fullWidth
            />
            <section className={classes.validationStyle}>
              {!formValid && errorMsg.errors.city}
            </section>
            <FormControl className={classes.formControl}>
              <InputLabel id="select-province">Province</InputLabel>
              <Select
                labelId="select-province"
                id="select-province"
                name="province"
                value={form.province}
                onChange={handleChange}
                required
                autoWidth
              >
                <MenuItem value="Alberta">Alberta</MenuItem>
                <MenuItem value="British Columbia">British Columbia</MenuItem>
                <MenuItem value="Manitoba">Manitoba</MenuItem>
                <MenuItem value="New Brunswick">New Brunswick</MenuItem>
                <MenuItem value="Newfoundland and Labrador">
                  Newfoundland and Labrador
                </MenuItem>
                <MenuItem value="Nova Scotia">Nova Scotia</MenuItem>
                <MenuItem value="Prince Edward Island">
                  Prince Edward Island
                </MenuItem>
                <MenuItem value="Quebec">Quebec</MenuItem>
                <MenuItem value="Saskatchewan">Saskatchewan</MenuItem>
              </Select>
              <section className={classes.validationStyle}>
                {!formValid && errorMsg.errors.province}
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
                Create Sale
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

SaleForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default SaleForm;

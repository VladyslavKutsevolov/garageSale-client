import React, { useState } from 'react';
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
import { editFormStyles } from './styles';

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

const initialState = {
  title: '',
  description: '',
  city: '',
  province: ''
};

const SaleForm = ({ handleClose, open }) => {
  const classes = editFormStyles();
  const { editGarage, saleId } = useStateData();
  const [form, setForm] = useState(initialState);
  const [saleImg, setSaleImg] = useState(null);
  const [modalStyle] = useState(getModalStyle);
  const [fileName, setFileName] = useState('');

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value
    });
  };

  const getImg = ({ target }) => {
    setSaleImg(target.files[0]);
    setFileName(target.files[0].name);
  };
  const clearInputFields = () => {
    setForm(initialState);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('saleImg', saleImg);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('city', form.city);
    formData.append('province', form.province);

    editGarage(saleId, formData);
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
            EDIT YOUR GARAGE SALE
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={handleChange}
              value={form.title}
              name="title"
              label="Title"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              value={form.description}
              name="description"
              label="Description"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              value={form.city}
              name="city"
              label="City"
              fullWidth
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="select-province">Province</InputLabel>
              <Select
                labelId="select-province"
                id="select-province"
                name="province"
                value={form.province}
                onChange={handleChange}
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
                EDIT
              </Button>
              <Button
                onClick={handleClose}
                variant="outlined"
                color="secondary"
              >
                CANCEL
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

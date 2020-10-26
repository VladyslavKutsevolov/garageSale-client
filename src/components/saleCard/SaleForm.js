/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
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
  }
}));

const initialState = {
  title: '',
  description: '',
  city: '',
  province: ''
};

const SaleForm = ({ handleClose, open }) => {
  const classes = useStyles();
  const [form, setForm] = useState(initialState);
  const [saleImg, setSaleImg] = useState(null);
  const [modalStyle] = useState(getModalStyle);
  const [fileName, setFileName] = useState('');

  const handleChange = ({ target }) => {
    console.log(form);
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

    axios.post('http://localhost:3001/sales/new', formData);
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

export default SaleForm;

import React, { useState, FC, ChangeEvent, FormEvent } from 'react';
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

type img = Blob | string;

interface ISaleItemEdit {
  title: string;
  productSummary: string;
  imageUrl: string;
  sold: string;
  handleClose(): void;
  open: boolean;
  price: string;
}

const SaleItemEdit: FC<ISaleItemEdit> = ({
  title,
  productSummary,
  price,
  imageUrl,
  sold,
  handleClose,
  open
}) => {
  const initialState = {
    title,
    description: productSummary,
    price,
    image_url: imageUrl
  };
  const classes = saleItemEditStyles();
  const [form, setForm] = useState(initialState);
  const [productImg, setProductImg] = useState<img>('');
  const [modalStyle] = React.useState(getModalStyle);
  const [fileName, setFileName] = useState('');
  const { editProduct, productId } = useStateData();

  const handleChange = ({
    target
  }: ChangeEvent<{ name?: any; value?: any }>) => {
    setForm({
      ...form,
      [target.name]: target.value
    });
  };

  const getImg = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files && target.files[0]) {
      setProductImg(target.files[0]);
      setFileName(target.files[0].name);
    }
  };
  const clearInputFields = () => {
    setForm(initialState);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('productImg', productImg);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('sold', sold);

    editProduct(productId, formData);
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
            Edit Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={handleChange}
              name="title"
              placeholder={title}
              label="Product Title"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              name="description"
              placeholder={productSummary}
              label="Product Description"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              name="price"
              placeholder={price}
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
                  placeholder={imageUrl}
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

export default SaleItemEdit;

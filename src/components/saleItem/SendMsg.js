/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Modal } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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

const SendMsg = props => {
  const initialMsg = {
    text: {
      textMessage: '',
      textComment: ''
    }
  };
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [msg, setMsg] = useState(initialMsg);
  const [open, setOpen] = useState(false);
  const { soldOut, productId } = useStateData();
  const { text } = msg;

  useEffect(() => {
    setMsg({
      text: {
        ...text,
        textMessage: `${props.buyer} will buy ${props.title} for $ ${props.price} from ${props.seller}. `
      }
    });
    props.setItemId(null);
  }, [props]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDisagree = () => {
    handleClose();
  };

  const clearInputFields = () => {
    setMsg(initialMsg);
  };

  const sendText = () => {
    fetch(
      `http://127.0.0.1:3001/send-text?recipient=${props.buyerPhone}&textMessage=Seller: ${props.sellerPhone}, ${text.textMessage} ${text.textComment}. `
    ).catch(err => console.error(err));

    fetch(
      `http://127.0.0.1:3001/send-text?recipient=${props.sellerPhone}&textMessage=Buyer: ${props.buyerPhone}, ${text.textMessage} ${text.textComment}. `
    ).catch(err => console.error(err));

    soldOut(productId);

    clearInputFields();
    props.handleSendClose();
  };

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleSendClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Commit to buying
          </Typography>
          <Typography variant="caption" gutterBottom>
            By sending this message you are committing to buying the product
            from the seller. The seller will receive your contact details so
            that you can arrange the transaction.
          </Typography>
          <TextField
            id="filled-read-only-input"
            label="Preview: Text Message"
            defaultValue={`${text.textMessage}`}
            InputProps={{
              readOnly: true
            }}
            variant="filled"
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            rows={2}
            value={text.textComment}
            onChange={e =>
              setMsg({ text: { ...text, textComment: e.target.value } })
            }
            label="Extra Comments?"
            fullWidth
          />
          <div className={classes.actionButtons}>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Buy this item!
            </Button>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Confirm Your Purchase
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={sendText} color="primary" autoFocus>
                  BUY
                </Button>
                <Button onClick={handleDisagree} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

            <Button
              onClick={props.handleSendClose}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SendMsg;

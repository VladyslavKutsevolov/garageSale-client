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
  const { text } = msg;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMsg({
      text: {
        ...text,
        textMessage: `${props.buyer} will buy ${props.title} by $ ${props.price} from ${props.seller}. `
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

  const handleSendClose = () => {
    props.handleClose();
  };

  const sendText = () => {
    fetch(
      `http://127.0.0.1:3001/send-text?recipient=${props.buyerPhone}&textMessage=Seller: ${props.sellerPhone}, ${text.textMessage} ${text.textComment}. `
    ).catch(err => console.error(err));

    fetch(
      `http://127.0.0.1:3001/send-text?recipient=${props.sellerPhone}&textMessage=Buyer: ${props.buyerPhone}, ${text.textMessage} ${text.textComment}. `
    ).catch(err => console.error(err));

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
            Send Text Message
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
              setMsg({ text: { ...text, textComment: e.target.value } })}
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
              Send BUY MSG!
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
              onClick={handleSendClose}
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

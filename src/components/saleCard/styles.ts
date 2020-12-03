import { makeStyles } from '@material-ui/core/styles';

export const saleCardStyles = makeStyles({
  title: {
    textAlign: 'center'
  },
  city: {
    textAlign: 'center',
    marginTop: '.5rem',
    marginBottom: '.5rem'
  },
  description: {
    textAlign: 'center',
    color: '#444'
  },
  time: {
    textAlign: 'right'
  }
});

export const saleCardListStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(30rem, 1fr))',
    justifyItems: 'center'
  }
});

export const saleFormStyles = makeStyles(theme => ({
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
  },
  validationStyle: {
    color: 'red'
  }
}));

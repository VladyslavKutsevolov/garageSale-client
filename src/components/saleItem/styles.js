import { makeStyles } from '@material-ui/core/styles';

export const editFormStyles = makeStyles(theme => ({
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

export const saleInfoStyles = makeStyles({
  media: {
    width: '45rem',
    height: '20rem',
    marginBottom: '1rem'
  },
  boxStyle: {
    boxShadow: '4px 6px 15px -6px rgba(0,0,0,0.5)',
    borderRadius: '4px',
    maxWidth: '45rem',
    marginTop: '2rem',
    flexBasis: '45%',
    justifyContent: 'center',
    paddingBottom: '1rem'
  },
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
  actions: {
    cursor: 'pointer',
    '&:hover': {
      color: '#0066ff'
    }
  }
});

export const saleItem = makeStyles(theme => ({
  root: {
    boxShadow: '4px 13px 20px -6px rgba(0,0,0,0.15)',
    minWidth: '45rem',
    marginBottom: '2rem',
    transition: 'all, 2s, ease-out',
    '&:hover': {
      boxShadow: '4px 13px 20px -6px rgba(0,0,0,0.45)'
    }
  },
  cardContentRoot: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    marginLeft: '1rem',
    marginRight: '1rem'
  },
  actionButtons: {
    display: 'flex',
    marginTop: '1rem'
  },
  buttonCustomStyle: {
    background:
      'linear-gradient(135deg, rgba(164,66,255,1) 0%, rgba(68,17,187,1) 39%, rgba(38,70,227,1) 69%, rgba(38,70,227,1) 88%)',
    color: '#fff'
  },
  soldOutButton: {
    background:
      'linear-gradient(135deg, rgba(160,166,10,1) 0%, rgba(200,117,87,1) 39%, rgba(200,70,27,1) 69%, rgba(255,70,27,1) 88%)',
    color: '#fff'
  },
  details: {
    display: 'flex',
    alignItems: 'center'
  },
  cover: {
    width: '25rem',
    height: '15rem'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  title: {
    padding: 0
  },
  actions: {
    cursor: 'pointer',
    '&:hover': {
      color: '#0066ff'
    }
  }
}));

export const saleItemEditStyles = makeStyles(theme => ({
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

export const saleItemFromStyles = makeStyles(theme => ({
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
  },
  validationStyle: {
    color: 'red'
  }
}));

export const saleItemPageStyles = makeStyles({
  innerContainer: {
    marginTop: '6rem',
    flexBasis: '25%'
  },
  root: {
    justifyContent: 'space-evenly'
  },
  category: {
    marginBottom: '2rem'
  },
  saleInfo: {
    marginTop: '6rem'
  }
});

export const sendMsgStyles = makeStyles(theme => ({
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

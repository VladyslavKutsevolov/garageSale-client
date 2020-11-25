import { makeStyles } from '@material-ui/core/styles';

export const commentStyles = makeStyles(() => ({
  root: {
    border: '1px solid #cacccc',
    borderRadius: '5px',
    padding: '7px',
    margin: '5px',
    backgroundColor: '#ebeded',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
  },
  seller: {
    border: '1px solid #ebd173',
    borderRadius: '5px',
    padding: '7px',
    margin: '5px',
    backgroundColor: '#f0e1aa',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
  },
  iconDiv: {
    position: 'absolute',
    top: '-17px',
    right: '-20px'
  },
  icon: {
    color: '#9c9c9c',
    maxHeight: '1rem'
  }
}));

export const commentContainerStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',

    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  icon: {
    height: '30px',
    padding: 0,
    margin: '20px 0px'
  }
}));

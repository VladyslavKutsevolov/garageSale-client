import { makeStyles } from '@material-ui/core/styles';

export const userStyle = makeStyles(theme => ({
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25)
  },
  container: {
    width: theme.spacing(40),
    height: theme.spacing(50),
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.5rem',
    boxShadow: '-2px 5px 25px -4px rgba(0,0,0,0.75)',
    borderRadius: '5px'
  },
  userInfo: {
    padding: '2rem',
    textAlign: 'center'
  }
}));

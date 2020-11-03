/* eslint-disable import/no-duplicates */

import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';

import {
  Container,
  Fab,
  IconButton,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  ListItemText,
  ListItem,
  ListItemIcon,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import StorefrontIcon from '@material-ui/icons/Storefront';

import SaleCardList from '../saleCard/SaleCardList';
import { useStateData } from '../../context/appContext';
import Login from '../auth/Login';
import LogOut from '../auth/LogOut';
import LoginForm from '../auth/LoginForm';
import SaleItemsPage from '../saleItem/SaleItemsPage';
import NotificationIcon from '../Notifications/NotificationIcon';
import EmptyNotificationIcon from '../Notifications/EmptyNotificationIcon';
import NotificationModal from '../Notifications/NotificationModal';
import InfoMsg from '../infoMsg/InfoMsg';
import SearchBy from './SearchBy';

const drawerWidth = 340;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  container: {
    maxWidth: '96%',
    margin: 'auto'
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background:
      'linear-gradient(135deg, rgba(164,66,255,1) 0%, rgba(68,17,187,1) 39%, rgba(38,70,227,1) 69%, rgba(38,70,227,1) 88%)',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  snackBar: {
    position: 'relative',
    top: '.1rem',
    marginBottom: '1rem'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  removeListStyle: {
    textDecoration: 'none',
    color: '#333'
  }
}));

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const {
    handleGarageFormOpen,
    handleProductOpen,
    saleId,
    setSaleId,
    message,
    error,
    loading,
    state
  } = useStateData();

  // Open state for login form
  const [open, setOpen] = useState(false);
  const [openLogin, setLoginForm] = useState(false);

  // Set user and sale data in state
  const [user, setUser] = useState('');
  const [userGarage, setUserGarage] = useState('');

  // Open state for notifications modal
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Handle drawer opening and closing
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Handle login closing
  const handleLoginClose = () => {
    setLoginForm(false);
  };

  useEffect(() => {
    const garageData = state.sales.filter(
      sale => sale.seller_id === state.loginUser.id
    );
    if (garageData) {
      setUserGarage(garageData[0]);
    } else {
      setUserGarage(null);
    }
  }, [state]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classnames(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={classnames(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome to Garage Sale App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={classnames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: classnames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/" className={classes.removeListStyle}>
            <ListItem button onClick={() => setSaleId(null)}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <ListItem>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <SearchBy />
          </ListItem>
          {user ? (
            <Link to="/products" className={classes.removeListStyle}>
              <ListItem button onClick={() => setSaleId(userGarage.id)}>
                <ListItemIcon>
                  <StorefrontIcon />
                </ListItemIcon>
                <ListItemText primary="MY GARAGE" />
              </ListItem>
            </Link>
          ) : null}
          {user ? (
            state.notifications && state.notifications.length ? (
              <NotificationIcon setNotificationsOpen={setNotificationsOpen} />
            ) : (
              <EmptyNotificationIcon
                setNotificationsOpen={setNotificationsOpen}
              />
            )
          ) : null}
          {user ? (
            !saleId ? (
              <ListItem button onClick={handleGarageFormOpen}>
                <ListItemIcon>
                  <Fab color="primary" aria-label="add" size="small">
                    <AddIcon />
                  </Fab>
                </ListItemIcon>
                <ListItemText primary="Create Sale" />
              </ListItem>
            ) : (
              <ListItem button onClick={handleProductOpen}>
                <ListItemIcon>
                  <Fab color="secondary" aria-label="add" size="small">
                    <AddIcon />
                  </Fab>
                </ListItemIcon>
                <ListItemText primary="Add Product" />
              </ListItem>
            )
          ) : null}
          {user ? (
            <LogOut setUser={setUser} />
          ) : (
            <Login setLoginForm={setLoginForm} />
          )}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container component="div" className={classes.container}>
          <div className={classes.snackBar}>
            <Snackbar
              open={loading}
              autoHideDuration={5000}
              className={classes.snackBar}
            >
              <Alert severity="info">Loading...</Alert>
            </Snackbar>
          </div>
          <InfoMsg error={error} message={message} loading={loading} />
          <Switch>
            <Route path="/" exact component={SaleCardList} />
            <Route path="/products" exact component={SaleItemsPage} />
          </Switch>

          <LoginForm
            open={openLogin}
            handleClose={handleLoginClose}
            setUser={setUser}
          />
          <NotificationModal
            notificationsOpen={notificationsOpen}
            setNotificationsOpen={setNotificationsOpen}
          />
        </Container>
      </main>
    </div>
  );
}

/* eslint-disable import/no-duplicates */

import React, { useState, useEffect, useRef } from 'react';
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
import { miniDrawerStyles } from './styles';

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

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

export default function MiniDrawer() {
  const classes = miniDrawerStyles();
  const theme = useTheme();
  const {
    handleGarageFormOpen,
    handleProductOpen,
    saleId,
    setSaleId,
    message,
    error,
    loading,
    state,
    showMessage
  } = useStateData();

  // Open state for login form
  const [open, setOpen] = useState(false);
  const [openLogin, setLoginForm] = useState(false);

  const focusSearchInput = useRef();
  const focusInput = () => {
    setOpen(true);

    focusSearchInput.current.focus();
  };

  // Set user and sale data in state
  const [user, setUser] = useState('');
  const [userGarage, setUserGarage] = useState('');

  // Open state for notifications modal
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);

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
            data-testid="drawer-opener"
            className={classnames(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="h6" noWrap>
            Welcome to Garaji! ...
            <Typography variant="subtitle1" component="span" noWrap>
              Host virtual garage sales, buy awesome stuff!
            </Typography>
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
          <ListItem onClick={focusInput} button>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <SearchBy inputFocus={focusSearchInput} />
          </ListItem>

          {user ? (
            userGarage ? (
              <Link to="/products" className={classes.removeListStyle}>
                <ListItem
                  button
                  onClick={() => setSaleId(userGarage.id)}
                  data-testid="my-sales"
                >
                  <ListItemIcon>
                    <StorefrontIcon />
                  </ListItemIcon>
                  <ListItemText primary="My sales" />
                </ListItem>
              </Link>
            ) : (
              <ListItem
                button
                onClick={() =>
                  showMessage(
                    'No garage! Please create your awesome garage first'
                  )
                }
              >
                <ListItemIcon>
                  <StorefrontIcon />
                </ListItemIcon>
                <ListItemText primary="My sales" />
              </ListItem>
            )
          ) : null}

          {user ? (
            state.latestComments &&
            state.latestComments.length &&
            !notificationsRead ? (
              <NotificationIcon
                setNotificationsOpen={setNotificationsOpen}
                setNotificationsRead={setNotificationsRead}
              />
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

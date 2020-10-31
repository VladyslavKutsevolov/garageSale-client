/* eslint-disable import/no-duplicates */

import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Container } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import { TextField, Avatar, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import { Notifications } from '@material-ui/icons';
import SaleCardList from '../saleCard/SaleCardList';
import { useStateData } from '../../context/appContext';
import Login from '../auth/Login';
import LogOut from '../auth/LogOut';
import LoginForm from '../auth/LoginForm';
import SaleItemsPage from '../saleItem/SaleItemsPage';

const drawerWidth = 240;

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
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const {
    handleGarageFormOpen,
    handleProductOpen,
    saleId,
    setSaleId,
    error,
    message
  } = useStateData();
  const [open, setOpen] = useState(false);
  const [openLogin, setLoginForm] = useState(false);
  const [notificationState, setNotificationState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });
  const [user, setUser] = useState('');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLoginClose = () => {
    setLoginForm(false);
  };

  const handleNotificationClick = newState => () => {
    setNotificationState({ open: true, ...newState });
  };

  const handleNotificationClose = () => {
    setNotificationState({ ...notificationState, open: false });
  };

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
          <Link to="/">
            <ListItem button onClick={() => setSaleId(null)}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <TextField id="standard-basic" label="Search" />
          </ListItem>
          <ListItem button onClick={() => setSaleId(null)}>
            <ListItemIcon>
              <NotificationsIcon
                onClick={handleNotificationClick({
                  vertical: 'bottom',
                  horizontal: 'center'
                })}
                onClose={handleNotificationClose}
              />
            </ListItemIcon>
            <ListItemText primary="Show Notifications" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Avatar
                alt="user"
                className={classes.small}
                src="https://www.blexar.com/avatar.png"
              />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>

          {!saleId ? (
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
          )}
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
          <Switch>
            <Route path="/" exact component={SaleCardList} />
            <Route path="/products" exact component={SaleItemsPage} />
          </Switch>

          <LoginForm
            open={openLogin}
            handleClose={handleLoginClose}
            setUser={setUser}
          />
        </Container>
      </main>
    </div>
  );
}

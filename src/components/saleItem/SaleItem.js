/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import CommentContainer from '../comments/CommentContainer';
import CardDropDown from './DropDownBox';
import { useStateData } from '../../context/appContext';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: '4px 13px 20px -6px rgba(0,0,0,0.75)',
    minWidth: '45rem',
    marginBottom: '2rem'
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
  }
}));

export default function SaleItem({
  id,
  imageUrl,
  title,
  price,
  productSummary,
  setItemId,
  sold,
  getProductId
}) {
  const { state, productId, fetchComments, saleId } = useStateData();
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const getProductInfo = () => {
    if (state.loginUser.username) {
      setItemId(id);
    } else {
      alert('Please Login First!');
    }
  };

  // Handles chevron for product_summary
  const handleExpandClick = () => {
    getProductId();
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContentRoot}>
        <div className={classes.details}>
          <CardMedia className={classes.cover} image={imageUrl} />
          <div className={classes.productInfo}>
            <div>
              <Typography component="h5" variant="h5">
                {title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {`Price ${price}`}
              </Typography>
            </div>
            <div className={classes.actionButtons}>
              {sold ? (
                <Button
                  variant="contained"
                  className={classes.soldOutButton}
                  onClick={() => alert('Sorry Sold Out')}
                >
                  PENDING
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={classes.buttonCustomStyle}
                  onClick={getProductInfo}
                >
                  I WILL BUY!
                </Button>
              )}
              <CardActions disableSpacing>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  Details
                  <ExpandMoreIcon
                    className={classNames(classes.expand, {
                      [classes.expandOpen]: expanded
                    })}
                  />
                </Button>
              </CardActions>
            </div>
          </div>
        </div>
      </CardContent>

      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        onClick={getProductId}
      >
        <CardContent>
          <CardDropDown
            comments={<CommentContainer />}
            description={productSummary}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}

/* eslint-disable react/prop-types */
import React from 'react';
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
import { useStateData } from '../../context/appContext';
import CommentContainer from '../comments/CommentContainer';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: '4px 13px 20px -6px rgba(0,0,0,0.75)',
    minWidth: '40rem',
    marginBottom: '2rem'
  },
  cardContentRoot: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonCustomStyle: {
    background:
      'linear-gradient(135deg, rgba(164,66,255,1) 0%, rgba(68,17,187,1) 39%, rgba(38,70,227,1) 69%, rgba(38,70,227,1) 88%)',
    color: '#fff',
    marginTop: '.7rem'
  },
  soldOutButton: {
    background:
      'linear-gradient(135deg, rgba(160,166,10,1) 0%, rgba(200,117,87,1) 39%, rgba(200,70,27,1) 69%, rgba(255,70,27,1) 88%)',
    color: '#fff',
    marginTop: '.7rem'
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
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
  const { state } = useStateData();
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  console.log('username in state', state)

  const getProductInfo = () => {
    if (state.loginUser.username) {
      setItemId(id);
    } else {
      alert('Please Login First!');
    }
  };

  // Handles chevron for product_summary
  const handleExpandClick = () => {
    setExpanded(!expanded);
    getProductId();
  };

  // Has images issues on different breackpoints
  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContentRoot}>
        <div className={classes.details}>
          <CardMedia className={classes.cover} image={imageUrl} />
          <div>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {`Price ${price}`}
            </Typography>
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

              <Button variant="contained" className={classes.buttonCustomStyle}>
                Contact Seller
              </Button>
              <CardActions disableSpacing>
                <IconButton
                  className={classNames(classes.expand, {
                    [classes.expandOpen]: expanded
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
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
          <CommentContainer />
          <Typography paragraph>Description:</Typography>
          {/* {productSummary} */}
        </CardContent>
      </Collapse>
    </Card>
  );
}

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


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginBottom: '2rem',
    boxShadow: '4px 13px 20px -6px rgba(0,0,0,0.75)'
  },
  buttonCustomStyle: {
    background:
      'linear-gradient(135deg, rgba(164,66,255,1) 0%, rgba(68,17,187,1) 39%, rgba(38,70,227,1) 69%, rgba(38,70,227,1) 88%)',
    color: '#fff',
    marginTop: '.7rem'
  },
  details: {
    display: 'flex'
  },
  cover: {
    width: '20rem'
  }
}));

export default function SaleItem({ imageUrl, title, price, description }) {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  //handles chevron for description
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // Has images issues on different breackpoints
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={imageUrl} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {description}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {`Price ${price}`}
          </Typography>
          <Button variant="contained" className={classes.buttonCustomStyle}>
            Contact Seller
          </Button>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={classNames(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
}

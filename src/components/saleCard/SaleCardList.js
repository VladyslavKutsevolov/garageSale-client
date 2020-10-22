import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import SaleCard from './SaleCard';

const fakeData = [
  { title: 'title1', location: 'location', description: 'description' },
  { title: 'title2', location: 'location', description: 'description' },
  { title: 'title3', location: 'location', description: 'description' },
  { title: 'title4', location: 'location', description: 'description' },
  { title: 'title5', location: 'location', description: 'description' }
];

const useStyles = makeStyles({
  root: {
    display: 'grid',
    width: '90%',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    justifyItems: 'center'
  }
});

const SaleCardList = () => {
  const classes = useStyles();

  return (
    <>
      <Grid
        className={classes.root}
        container
        spacing={3}
        wrap="wrap"
        component="div"
      >
        {fakeData.map(data => (
          <Grid item key={data.title}>
            <SaleCard {...data} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SaleCardList;

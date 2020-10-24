import React, { useState } from 'react';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { makeStyles } from '@material-ui/core/styles';

const { red, blue, green } = require('@material-ui/core/colors');
const Button = require('@material-ui/core/Button').default;

const fakeProductData = [
  {
    id: 1,
    title: 'Lava lamp',
    price: 5.0,
    productSummary: 'Lava lamp in good condition. Lava still works.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/f/f2/1990s_Mathmos_Astro.jpg'
  },
  {
    id: 2,
    title: 'Monstera Plant',
    price: 12.0,
    productSummary: 'A nice plant. Grows. Needs water (not included).',
    imageUrl: 'https://picsum.photos/300/210'
  },
  {
    id: 3,
    title: 'Used Xbox',
    price: 80.0,
    productSummary: "Comes with games. Selling because of son's bad behaviour.",
    imageUrl: 'https://picsum.photos/300/210'
  },
  {
    id: 4,
    title: 'Scarf',
    price: 22.5,
    productSummary:
      "Used it to keep my neck warm. No longer needed as my neck isn't cold now.",
    imageUrl: 'https://picsum.photos/300/210'
  },
  {
    id: 5,
    title: 'Watch',
    price: 8.99,
    productSummary: 'Tells you the time. Needs a new battery',
    imageUrl: 'https://picsum.photos/300/210'
  }
];


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    marginBottom: '2rem',
    boxShadow: '4px 13px 20px -6px rgba(0,0,0,0.75)'
  }
}));

export default function Carousel() {
  // probaby going to need to use this higher in component chain and pass open prop dowm
  const [open, setOpen] = React.useState(false);
  const [handleOpen, setHandleOpen] = useState({ open: false });
  const handleClick = () => {
    setHandleOpen({ open: true });
  };

  const classes = useStyles();

  return (
    <div>
      <Button className={classes.root} onClick={handleClick}> Click here to see carousel </Button>
      <AutoRotatingCarousel
        // label="Get started"
        open={handleOpen.open}
        onClose={() => setHandleOpen({ open: false })}
        onStart={() => setHandleOpen({ open: false })}
        style={{ position: 'absolute' }}
      >

        {fakeProductData.map(product => (
          <Slide
            media={<img src={product.imageUrl} alt={product.title} />}
            mediaBackgroundStyle={{ backgroundColor: blue[400] }}
            style={{ backgroundColor: blue[600] }}
            title={`${product.title}: ${product.price}`}
            subtitle={product.productSummary}
          />
        ))}
      </AutoRotatingCarousel>
    </div>
  );
}

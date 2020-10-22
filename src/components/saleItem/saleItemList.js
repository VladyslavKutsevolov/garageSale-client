import React from 'react';
import SaleItem from './SaleItem';

const fakeProductData = [
  {
    title: 'Lava lamp',
    price: 5.0,
    description: 'Lava lamp in good condition. Lava still works.',
    image_url:
      'https://upload.wikimedia.org/wikipedia/commons/f/f2/1990s_Mathmos_Astro.jpg'
  },
  {
    title: 'Monstera Plant',
    price: 12.0,
    description: 'description',
    image_url: 'public/images/plant.png'
  },
  {
    title: 'Used Xbox',
    price: 80.0,
    description: 'Comes with games. Selling because of son\'s bad behaviour.',
    image_url: '../../../public/images/xbox.png'
  },
  {
    title: 'Scarf',
    price: 22.5,
    description:
      "Used it to keep my neck warm. No longer needed as my neck isn't cold now.",
    image_url: 'public/images/scarf.png'
  },
  {
    title: 'Watch',
    price: 8.99,
    description: 'Tells you the time. Needs a new battery',
    image_url: 'public/images/watch.png'
  }
];

const SaleItemList = () => {

  const days = fakeProductData.map(product => (
    <SaleItem
      title={product.title}
      price={product.price}
      description={product.description}
      image_url={product.image_url}
      />
    ));

  return days;
}
export default SaleItemList;

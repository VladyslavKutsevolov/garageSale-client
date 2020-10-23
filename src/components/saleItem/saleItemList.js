/* eslint-disable quotes */
import React from 'react';
import SaleItem from './SaleItem';

const fakeProductData = [
  {
    id: 1,
    title: 'Lava lamp',
    price: 5.0,
    product_summary: 'Lava lamp in good condition. Lava still works.',
    image_url:
      'https://upload.wikimedia.org/wikipedia/commons/f/f2/1990s_Mathmos_Astro.jpg'
  },
  {
    id: 2,
    title: 'Monstera Plant',
    price: 12.0,
    product_summary: 'A nice plant. Grows. Needs water (not included).',
    image_url: 'https://picsum.photos/300/210'
  },
  {
    id: 3,
    title: 'Used Xbox',
    price: 80.0,
    product_summary:
      "Comes with games. Selling because of son's bad behaviour.",
    image_url: 'https://picsum.photos/300/210'
  },
  {
    id: 4,
    title: 'Scarf',
    price: 22.5,
    product_summary:
      "Used it to keep my neck warm. No longer needed as my neck isn't cold now.",
    image_url: 'https://picsum.photos/300/210'
  },
  {
    id: 5,
    title: 'Watch',
    price: 8.99,
    product_summary: 'Tells you the time. Needs a new battery',
    image_url: 'https://picsum.photos/300/210'
  }
];

const SaleItemList = () => {
  const days = fakeProductData.map(product => (
    <SaleItem
      key={product.id}
      title={product.title}
      price={product.price}
      productSummary={product.product_summary}
      imageUrl={product.image_url}
    />
  ));

  return days;
};

export default SaleItemList;

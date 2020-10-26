/* eslint-disable no-confusing-arrow */
import React, { useState } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

const ChatButton = () => {
  const [saleId, setSaleId] = useState('');
  const [userId, setUserId] = useState('');
  const [sellerId, setSellerId] = useState('');

  // Grab userId from cookies

  // Grab sale id from sale page url

  // Get seller ID with custom function

  return (
    <div>
      <Link
        onClick={event => !userId || !sellerId || !saleId || userId === sellerId ? event.preventDefault() : null}
        to={`/chat?saleId=${saleId}&userId=${userId}&sellerId=${sellerId}`}
      >
        <button className="button mt-20" type="submit">
          Chat with seller
        </button>
      </Link>
    </div>
  );
};

export default ChatButton;

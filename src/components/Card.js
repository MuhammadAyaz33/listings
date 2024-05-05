import React from 'react';
import PropTypes from 'prop-types';
import { UseLocalStorage } from 'hooks/useLocalStorage';
import { UseRoute } from 'hooks/useRoute';

const Card = ({ listing, handleDelete }) => {
  const { setItem } = UseLocalStorage('listing');

  const handleCard = (listing) => {
    setItem(listing);
    UseRoute('/listing-details');
  };

  return (
    <>
      {listing && (
        <div className="card">
          <h2 className="name">{listing?.name}</h2>
          <p className="country">{listing?.country}</p>
          <div className="domains">
            {listing?.domains.map((domian, ind) => (
              <div key={ind}>
                <p>{domian}</p>
              </div>
            ))}
          </div>
          <div className="actions-btn">
            <button onClick={() => handleCard(listing)}>Details</button>
            <button className="delete-btn" onClick={() => handleDelete()}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Card.propTypes = {
  listing: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Card;

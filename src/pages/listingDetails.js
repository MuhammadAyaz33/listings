import React from 'react';
import { UseLocalStorage } from 'hooks/useLocalStorage';

const ListingDetails = () => {
  const { getItem } = UseLocalStorage('listing');
  const listing = getItem();
  
  return (
    <div className="wrapper">
      {listing && (
        <div className="listing-details">
          <h2 className="title">{listing?.name}</h2>
          <p className="description">{listing?.country}</p>
            <div className="listing-domains">
              {listing?.domains.map((domian, ind) => (
                <div key={ind}>
                  <p>{domian}</p>
                </div>
              ))}
            </div>
            <div className="listing-pages">
              {listing?.web_pages.map((page, ind) => (
                <div key={ind}>
                  <a target="_blank" rel="noreferrer" href={page}>{page}</a>
                </div>
              ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;

import React, { useMemo, useState } from 'react';
import { UseAxios } from 'hooks/useAxios';
import Card from 'components/Card';
import FailureCard from 'components/FailureCard';
import { FAILURE_MESSAGE, URL } from 'constants/constants';
import { SearchListing, SortListing } from 'helpers/helpers';
import { DeleteItem } from 'helpers/helpers';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sorted, setSorted] = useState(false);
  const [animate, setAnimate] = useState(false)
  const { data, error, loaded } = UseAxios(
    URL,
    'get'
  );

  useMemo(() => {
    setListings(data);
  }, [data]);

  const handleSorting = () => {
    setSorted(!sorted);
    SortListing(setListings, sorted);
  }

  if (loaded) {
    return error ? (
        <FailureCard title="Something went wrong" message={error || FAILURE_MESSAGE} />
    ) : (
      <>
        <div className="wrapper">
          <input className="search-input" type="text" name="search" placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => SearchListing(e.target.value, setSearchTerm, setListings)} />

          <button className="sort-btn" onClick={() => handleSorting()}>{sorted ? "Sorted" : "Sort"}</button>
        </div>
        <div className="wrapper">
          {listings && listings.map((listing, ind) => (
            <div key={ind} className={ animate ? "example-enter" : null }>
              <Card listing={listing} handleDelete={() => DeleteItem(ind, setListings, setAnimate)} />
            </div>
          ))}
        </div>
      </>

    );
  }
  return <span className="loading">Loading...</span>;
}

export default Listings;

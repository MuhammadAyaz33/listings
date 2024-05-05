import React, { useMemo, useState } from 'react';
import { UseAxios } from 'hooks/useAxios';
import Card from 'components/Card';
import FailureCard from 'components/FailureCard';
import { FAILURE_MESSAGE, URL } from 'constants/constants';
import { searchListing, sortListing, deleteItem } from 'helpers';
import { UseLocalStorage } from 'hooks/useLocalStorage';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sorted, setSorted] = useState(false);
  const { setItem, getItem } = UseLocalStorage('listings'); // UseLocalStorage custom hook to get data from loacalstorage if api fails 
  const { data, error, loaded } = UseAxios(URL, 'get');  // UseAxios custom hook to fetch data using axios

  useMemo(() => {
    // Checking if data is comming from api else will get from cache storage
    if (data) {
      setItem(data);
      setListings(data);
    } else {
      if (getItem() !== undefined) {
        setListings(getItem());
      }
    }
  }, [data, error]);

  const handleSorting = () => { 
    setSorted(!sorted);
    sortListing(setListings, sorted); //helper method to sort the list alphabeticaly 
  };

  if (loaded) {
    return listings.length === 0 && error ? (
      <FailureCard title="Something went wrong" message={error || FAILURE_MESSAGE} />
    ) : (
      <>
        <div className="wrapper">
          <input
            className="search-input"
            type="text"
            name="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => searchListing(e.target.value, setSearchTerm, setListings)}
          />

          <button className="sort-btn" onClick={() => handleSorting()}>
            {sorted ? 'Sorted' : 'Sort'}
          </button>
        </div>
        <div className="wrapper">
          {listings &&
            listings.map((listing, ind) => (
              <div key={ind}>
                <Card listing={listing} handleDelete={() => deleteItem(ind, setListings)} />
              </div>
            ))}
        </div>
      </>
    );
  }
  return <span className="loading">Loading...</span>;
};

export default Listings;

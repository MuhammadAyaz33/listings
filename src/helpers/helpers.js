import { UseLocalStorage } from 'hooks/useLocalStorage';
const { getItem, setItem } = UseLocalStorage('listings');

export const SortListing = (setListings, sorted) => {
    const listingArray = [...getItem()];
    if(!sorted){
        listingArray.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }
    setListings(listingArray);
}

export const SearchListing = (search, setSearchTerm,  setListings) => {
    setSearchTerm(search);
    const listingArray = [...getItem()];
    const filtered = listingArray.filter(listing => listing.name.toLowerCase().includes(search.toLowerCase()));
    setListings(filtered);
};

export const DeleteItem = (ind, setListings, setAnimate) => {
    const listingArray = [...getItem()];
    const filtered = listingArray.filter((item, index) => index !== ind);
    setAnimate( true )
    setTimeout( () => { setAnimate( false ) }, 500 )
    setItem(filtered);
    setListings(filtered);
};
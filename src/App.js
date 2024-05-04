import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Listings from 'pages/listings';
import ListingDetails from 'pages/listingDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/listing-details" element={<ListingDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

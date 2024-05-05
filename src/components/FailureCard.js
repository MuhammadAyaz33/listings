import React from 'react';
import PropTypes from 'prop-types';

const FailureCard = ({ title, message }) => {
  return (
    <div className="failure-wrapper">
      <div className="alert">
        <h4>{title}</h4>
        <div className="alert_text">{message}</div>
      </div>
    </div>
  );
};

FailureCard.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default FailureCard;

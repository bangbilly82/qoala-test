import React from 'react';

const Cards = ({ name, location, email, dob, picture, background }) => {
  return (
    <div className={`qoala-card__wrapper ${background}`}>
      <div className="image-wrapper">
        <div className="image-thumbnail">
          <img src={picture.medium} alt={name.first} />
        </div>
        <div className="user-profile">
          <h2 className="name">
            {name.title} {name.first} {name.last}
          </h2>
          <p className="age">{dob.age} years old</p>
          <p className="mobile-email">{email}</p>
        </div>
      </div>
      <div className="address">
        <p>
          {location.city}, {location.state} {location.postcode}
        </p>
      </div>
      <h4 className="email">{email}</h4>
    </div>
  );
};

export default Cards;

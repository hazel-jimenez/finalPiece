import React from 'react';
import { Link } from 'react-router-dom';

const AdList = ({ favoritesCount, username, ads }) => {
  if (!ads || !ads.length) {
    return <p className="bg-dark text-light p-3">{username}, Create your Ad!</p>;
  }

  return (
    <div>
      <h5>
        {username}'s {adCount} {adCount === 1 ? 'ad' : 'ads'}
      </h5>
      {ads.map(ad => (
        <button className="btn w-100 display-block mb-2" key={ad._id}>
          <Link to={`/profile/${ad.username}`}>{ad.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default AdList;

import React from 'react';
import { Link } from 'react-router-dom';

const FavoriteList = ({ favoriteCount, username, favorites }) => {
  if (!favorites || !favorites.length) {
    return <p className="bg-dark text-light p-3">{username}, choose your favorite developers!</p>;
  }

  return (
    <div>
      <h5>
        {username}'s {favoriteCount} {favoriteCount === 1 ? 'favorite' : 'favorites'}
      </h5>
      {favorites.map(favorite => (
        <button className="btn w-100 display-block mb-2" key={favorite._id}>
          <Link to={`/profile/${favorite.username}`}>{favorite.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FavoriteList;

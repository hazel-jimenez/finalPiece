import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Auth from "../utils/auth";

import { ADD_FAVORITE } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

import AdList from "../components/AdList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";
import FavoriteList from "../components/FavoriteList";
import AdForm from "../components/AdForm";

const Profile = () => {
  const [addFavorite] = useMutation(ADD_FAVORITE);

  const { "*": userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFavorite({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-row justify-space-between mb-3">
      <div className="col-12 mb-3 col-lg-8">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>

        <AdList
          ads={user.ads}
          title={`${user.username}'s ads...`}
        />
      </div>

      <div className="col-12 col-lg-3 mb-3">
        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Favorite
          </button>
        )}
        <FavoriteList
          username={user.username}
          favoriteCount={user.favoriteCount}
          favorites={user.favorites}
        />
      </div>
      <div className="mb-3">{!userParam && <AdForm />}</div>
    </div>
  );
};

export default Profile;

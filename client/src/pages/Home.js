import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ADS, QUERY_ME_BASIC } from "../utils/queries";
import AdList from "../components/AdList/index";
import Auth from "../utils/auth";
import FavoriteList from "../components/FavoriteList";
import AdForm from "../components/AdForm";

const Home = () => {
  const loggedIn = Auth.loggedIn();
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_ADS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const ads = data?.ads || [];

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <AdForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <AdList
              ads={ads}
              title="Find the right developer for you..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FavoriteList
              username={userData.me.username}
              favoriteCount={userData.me.favoriteCount}
              favorites={userData.me.favorites}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;

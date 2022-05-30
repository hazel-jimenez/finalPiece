import React from "react";
import { Link } from "react-router-dom";

const AdList = ({ ads, title }) => {
  if (!ads.length) {
    return <h3>No Ads Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {ads &&
        ads.map((ad) => (
          <div key={ad._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${ad.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {ad.username}
              </Link>{" "}
              ad on {ad.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/ad/${ad._id}`}>
                <p>{ad.adText}</p>
                <p className="mb-0">
                  Reviews: {ad.reviewCount} || Click to{" "}
                  {ad.reviewCount ? "see" : "start"} the reviews!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AdList;

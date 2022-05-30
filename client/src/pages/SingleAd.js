import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_AD } from "../utils/queries";
import ReviewList from "../components/ReviewList";
import Auth from "../utils/auth";
import ReviewForm from "../components/ReviewAd";
import StarRating from "../components/StarRating";

const SingleAd = (props) => {
  const { id: adId } = useParams();

  const { loading, data } = useQuery(QUERY_AD, {
    variables: { id: adId },
  });

  const ad = data?.ad || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {ad.username}
          </span>{" "}
          ad on {ad.createdAt}
        </p>
        <div className="card-body">
          <p>{ad.adText}</p>
        </div>
      </div>
      <div className="card mb-3 flex-row justify-center">
      <StarRating />
      </div>
      {ad.reviewCount > 0 && (
        <ReviewList reviews={ad.reviews} />
      )}
      {Auth.loggedIn() && <ReviewForm adId={ad._id} />}
    </div>
  );
};

export default SingleAd;

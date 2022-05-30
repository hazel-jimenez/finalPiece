import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_AD } from "../../utils/mutations";

import { QUERY_ADS, QUERY_ME } from "../../utils/queries";

const AdForm = () => {
  const [addAd, { error }] = useMutation(ADD_AD, {
    update(cache, { data: { addAd } }) {
      // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, ads: [...me.ads, addAd] } },
        });
      } catch (e) {
        console.warn("First ad insertion by user!");
      }

      // update ad array's cache
      const { ads } = cache.readQuery({ query: QUERY_ADS });
      cache.writeQuery({
        query: QUERY_ADS,
        data: { ads: [addAd, ...ads] },
      });
    },
  });
  const [adText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add ad to database
      await addAd({
        variables: { adText },
      });

      // clear form value
      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Here's a new ad..."
          value={adText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdForm;

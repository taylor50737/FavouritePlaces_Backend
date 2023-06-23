const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyAl2w95sTocXy8EgnaQ_nGHASKpc4H1cIM";

const getCoordsForAddress = async (address) => {
  //   return { lat: 40.7484474, lng: -73.9871516 };
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location ofr the specified address.",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
};

module.exports = getCoordsForAddress;
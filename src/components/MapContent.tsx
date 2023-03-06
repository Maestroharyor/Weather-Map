import React, { useEffect, useState } from "react";
import ReactMapGL from "react-map-gl";
import { City } from "../types";

type Props = {
  selectedCity: City | null;
};

const MapContent = ({ selectedCity }: Props) => {
  const mapboxAccessToken =
    "pk.eyJ1IjoibWFlc3Ryb2hhcnlvciIsImEiOiJjbGV0NDhmNjYwYzM2M3JzMGdkczRzZzY5In0.w4IobF1P7PIhvQhK9YsoRA";
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  useEffect(() => {
    if (selectedCity) {
      setViewport({
        latitude: Number(selectedCity.lat),
        longitude: Number(selectedCity.lng),
        zoom: 8,
      });
    }
  }, [selectedCity]);

  return (
    <div className="w-full">
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={mapboxAccessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      ></ReactMapGL>
    </div>
  );
};

export default MapContent;

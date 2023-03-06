import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { City } from "../types";
import MapContent from "./MapContent";
import Sidebar from "./Sidebar";
import WeatherModal from "./WeatherModal";

const MainApp: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  //   Gets cities in the world once app loads
  useEffect(() => {
    setIsLoadingCities(true);
    axios
      .get(
        "https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json"
      )
      .then((response) => {
        console.log(response);
        const cities = response.data.map((city: City) => city);
        const randomCities = Array.from(
          { length: 20 },
          () => cities[Math.floor(Math.random() * cities.length)]
        );
        setCities(randomCities);
        setFilteredCities(randomCities);
        setSelectedCity(randomCities[0]);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoadingCities(false));
  }, []);

  return (
    <div className="h-[100vh] overflow-hidden">
      {/* Mobile Navbar */}
      <div className=" md:hidden px-5 z-50 flex justify-between items-center">
        <p className="text-2xl font-bold">
          Weather <span className="text-orange-500">Map</span>
        </p>
        <button
          className="rounded-full w-16 h-16 bg-primary-500 text-white flex items-center justify-center"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FiMenu size={28} />
        </button>
      </div>
      {/* Overlay */}
      <div
        className={`${
          showMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        } fixed top-0 left-0 w-full h-full z-50`}
        onClick={() => setShowMenu(false)}
      ></div>
      <div className="flex relative">
        <Sidebar
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          cities={cities}
          filteredCities={filteredCities}
          setFilteredCities={setFilteredCities}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          isLoadingCities={isLoadingCities}
        />
        <MapContent selectedCity={selectedCity} />
        <WeatherModal selectedCity={selectedCity} />
      </div>
    </div>
  );
};

export default MainApp;

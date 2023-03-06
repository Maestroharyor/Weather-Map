import React from "react";
import { City } from "../types";

type Props = {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  cities: City[];
  filteredCities: City[];
  setFilteredCities: React.Dispatch<React.SetStateAction<City[]>>;
  selectedCity: City | null;
  setSelectedCity: React.Dispatch<React.SetStateAction<City | null>>;
  isLoadingCities: boolean;
};
const Sidebar: React.FC<Props> = ({
  showMenu,
  setShowMenu,
  cities,
  filteredCities,
  setFilteredCities,
  selectedCity,
  setSelectedCity,
  isLoadingCities,
}) => {
  const handleCityFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredCities = cities.filter((city) =>
      city.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCities(filteredCities);
  };

  const handleCityClick = (city: City) => {
    setSelectedCity(city);
    setShowMenu(false);
  };

  return (
    <div
      className={`${
        showMenu ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transform transition ease-in-out md:ease-out fixed md:relative top-0 left-0 w-full md:w-72 h-screen overflow-y-auto bg-gray-900 border-r-2 border-gray-800 pt-4 pb-10 z-50 px-4 md:py-6 md:px-4`}
    >
      <div className="flex justify-between items-center py-2 md:px-4">
        <p className="text-2xl font-bold">
          Weather <span className="text-orange-500">Map</span>
        </p>
        {/* Close button on mobile/tablet */}
        <button
          className="md:hidden text-2xl text-gray-500"
          onClick={() => setShowMenu(false)}
        >
          &times;
        </button>
      </div>
      <div className="py-6">
        <input
          type="text"
          placeholder="Search for a city..."
          className="input input-bordered input-warning w-full"
          onChange={handleCityFilter}
        />
      </div>
      {isLoadingCities ? (
        <div className="py-6">
          <p className="text-center">Fetching cities...</p>
        </div>
      ) : null}
      <nav className="flex flex-col divide-y divide-yellow-500">
        {filteredCities.map((city) => (
          <div className="py-3" key={city.name}>
            <div
              key={city.name}
              className={`flex items-center justify-between cursor-pointer hover:bg-gray-800 rounded-md py-2 px-4 transition duration-300 ease-in-out ${
                selectedCity?.name === city.name ? "bg-gray-800" : ""
              }`}
              onClick={() => handleCityClick(city)}
            >
              <div className="flex flex-col ">
                <p className="text-lg font-bold">{city.name}</p>
                <p className="text-xs text-gray-500">{city.country}</p>
              </div>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

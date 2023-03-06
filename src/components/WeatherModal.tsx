import axios from "axios";
import React, { MouseEvent, useEffect, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { FaCircleNotch } from "react-icons/fa";
import { City, WeatherDataType, WeatherList } from "../types";
import { capitalize, formatDate, formatTemperature } from "../utils";

type Props = {
  selectedCity: City | null;
};

const WeatherModal = ({ selectedCity }: Props) => {
  const openWeatherApiKey = "c51525ffadd82856bb353881faf93b7d";
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherDataType | null>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const fetchWeather = async () => {
    setIsLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity?.lat}&lon=${selectedCity?.lng}&appid=${openWeatherApiKey}`
      )
      .then((response) => {
        const weather = response.data;
        setWeather(weather);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (selectedCity && isOpen) {
      fetchWeather();
    }
  }, [selectedCity, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setWeather(null);
    }
  }, [isOpen]);

  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  const closeModalOnBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (target.matches(".backdrop")) {
      closeModal();
    }
  };

  return (
    <>
      {selectedCity && !isOpen && (
        <button
          className="btn btn-circle bg-gray-800 hover:bg-gray-900 text-white fixed left-[20px] top-24 md:left-64 hover:scale-110 text-2xl animate-bounce"
          onClick={openModal}
        >
          <FiInfo />
        </button>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-md backdrop"
          onClick={closeModalOnBackdropClick}
        >
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full md:w-[700px] flex flex-col gap-8 overflow-y-auto">
            <h2 className="font-medium text-orange-500 text-xl md:text-3xl">
              {isLoading
                ? `Loading Weather Forecast for ${selectedCity?.name} `
                : `Weather Forecast for ${selectedCity?.name}`}
            </h2>
            {isLoading ? (
              <div className="text-5xl flex py-10">
                <FaCircleNotch className="animate-spin" />
              </div>
            ) : (
              <div className="w-full overflow-x-auto h-[400px] md:h-auto">
                {weather && (
                  <table className="table table-bordered table-hover w-full">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Description</th>
                        <th>Temperature</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weather?.list.map((item: WeatherList) => {
                        const itemDate = new Date(item.dt_txt);
                        if (itemDate < today || itemDate > tomorrow) {
                          return null;
                        }
                        const { formattedDate, isToday } = formatDate(
                          item.dt_txt
                        );
                        return (
                          <tr key={item.dt}>
                            <td>
                              {`${
                                isToday ? "Today" : "Tomorrow"
                              } ${formattedDate}`}
                            </td>
                            <td>{itemDate.toLocaleTimeString()}</td>
                            <td>{capitalize(item.weather[0].description)}</td>
                            <td>{formatTemperature(item.main.temp)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}
            <button className="btn btn-primary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherModal;

"use client";

import React, { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { getWeatherData } from "src/app/actions/getWheatherData";
import { WeatherData } from "src/lib/common.types";
import { useOutsideClick } from "src/hooks/useOutsideClick";
import { cities, WeatherInpType } from "src/lib/schema";
import Image from "next/image";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState("Istanbul");
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true; // Mount condition for race condition issue https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect

    const fetchWeather = async () => {
      const data = await getWeatherData(selectedCity as WeatherInpType);
      if (isMounted && data) setWeatherData(data);
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 5000); // Fetch every 5 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [selectedCity]);

  useOutsideClick(dropdownRef, () => setDropdown(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdown(!dropdown)}
        className="flex items-center min-w-44 max-w-60 space-x-1 hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-all ease-in-out duration-300"
        aria-haspopup="true"
        aria-expanded={dropdown}
      >
        {weatherData && (
          <>
            <Image
              src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
              alt={"Weather condition"}
              width={28}
              height={28}
            />
            <span>{weatherData.temperature}°C</span>
          </>
        )}
        <span>{selectedCity}</span>
        <ChevronDown
          className={`transform transition-transform duration-300 ${
            dropdown ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`absolute right-0 w-full bg-gray-500 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out overflow-y-auto ${
          dropdown
            ? "opacity-100 translate-y-0 max-h-40"
            : "opacity-0 -translate-y-2 max-h-0"
        }`}
      >
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => {
              setSelectedCity(city);
              setDropdown(false);
            }}
            className="block w-full px-4 py-2 text-sm text-left text-gray-200 hover:bg-gray-600 transition-colors duration-200"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;

"use server";
import { WeatherData } from "src/lib/common.types";
import {
  weatherDataSchema,
  weatherInpSchema,
  WeatherInpType,
} from "src/lib/schema";
import { verifySession } from "./utils";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";

export const getWeatherData = async (
  city: WeatherInpType
): Promise<WeatherData | null> => {
  const verify = await verifySession();
  if (!verify) {
    redirect("/login");
  }
  return await weatherData(city);
};

const weatherData = unstable_cache(
  async (city: WeatherInpType): Promise<WeatherData | null> => {
    const validationResult = weatherInpSchema.safeParse({ city });
    if (!validationResult.success) {
      console.error("Invalid city input");
      return null;
    }

    const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
    const _cities = encodeURIComponent(
      validationResult.data.city.toLowerCase()
    );
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${_cities}&appid=${API_KEY}&units=metric`,
        { next: { revalidate: 5 } }
      );

      const data = await response.json();
      const parsedResult = weatherDataSchema.safeParse(data);

      if (!parsedResult.success) {
        console.error("Invalid weather data received");
        return null;
      }

      const validData = parsedResult.data;
      return {
        temperature: Math.round(validData.main.temp),
        condition: validData.weather[0].main,
        icon: validData.weather[0].icon,
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  },
  ["weather"],
  { revalidate: 5 }
);

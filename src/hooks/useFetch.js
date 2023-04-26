import { resizeCache } from "@/Util";
const { useState, useEffect, useCallback } = require("react");

const _cache = {};

export const getWeatherAPIUrl = (zip) => {
	return `https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}&units=metric`;
};

export const useFetch = ({ zipCode }) => {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const [isError, setError] = useState(false);

	// We can use `useCallback` here.
	const fetchData = async (zip, country) => {
		const key = `${zip}_${country}`;
		if (_cache[key]) {
			setData(_cache[key]);
			setLoading(false);
		} else {
			try {
				const response = await fetch(getWeatherAPIUrl(zip));
				if (!response.ok) {
					throw new Error("Something went wrong");
				}
				const data = await response.json();
				resizeCache(_cache);
				_cache[key] = data;
				setData(data);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		fetchData(zipCode);
	}, [zipCode]);

	return {
		data,
		isLoading,
		isError,
	};
};

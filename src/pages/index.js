import { groupWeatherDataByDate } from "@/Util";
import { InputText } from "@/components/FormComponents";
import { WeatherCard } from "@/components/Layout/WeatherCard";
import If from "@/components/Util/If";
import { useFetch } from "@/hooks";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const [zipCode, setZipcode] = useState(31217);

	const { data } = useFetch({ zipCode });

	if (data == null) return null;

	const mainData = data.list.length ? data.list.at(0).main : null;
	const weather = data.list.length ? data.list.at(0).weather.at(0) : null;
	const city = data.city;
	const processedData = groupWeatherDataByDate(data.list);

	return (
		<main className={`flex min-h-screen flex-col items-center justify-center ${inter.className}`}>
			<div className="flex items-center mb-[20px] text-[30px] ">
				<div className="text-[#333] text-[30px] text-center ">Weather Status showing for</div>
				<InputText
					className="ml-[10px] w-[100px]"
					value={zipCode}
					onChange={(value) => {
						setZipcode(value);
					}}
				/>
			</div>
			<If truth={!!data}>
				<WeatherCard todayWeather={weather} temperatureData={mainData} data={processedData} city={city} />
			</If>
		</main>
	);
}

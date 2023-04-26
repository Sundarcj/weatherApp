import Image from "next/image";
import GlassCard from "../GlassCard";
import { DayWeatherCard } from "./DayWeatherCard";
import { useState } from "react";

export const WeatherCard = ({ city, todayWeather, temperatureData, data }) => {
	const [seletedDate, setSelectedDate] = useState(Object.keys(data).at(0));
	return (
		<GlassCard>
			<div className="flex flex-col">
				<div className="flex justify-between w-full  mb-[20px] border-1">
					<div className="flex flex-col">
						<span className="text-[18px]">{city.name}</span>
						<span className="text-[10px]">{new Date().toDateString()}</span>
						<Image width="50" height="50" alt={todayWeather.description} src={`http://openweathermap.org/img/wn/${todayWeather.icon}.png`} />
						<span className="text-[14px] font-medium">{todayWeather.main}</span>
					</div>
					<div className="flex flex-col">
						<span className="text-[42px] degree">{temperatureData.temp}</span>
						<div className="flex items-center">
							<span className="text-[14px] mx-1 degree">{temperatureData.temp_min}</span> / <span className="text-[14px] mx-1 degree">{temperatureData.temp_max}</span>
						</div>
					</div>
				</div>

				<div className="flex mb-[20px] overflow-auto justify-around border-b border-amber-50 pb-1">
					{Object.keys(data).map((item, index) => {
						return (
							<div
								key={`header_${index}`}
								className={`shrink-0 cursor-pointer ${seletedDate == item ? "font-bold" : ""}`}
								onClick={() => {
									setSelectedDate(item);
								}}
							>
								{item.split(" ").at(0)}
							</div>
						);
					})}
				</div>

				<div className="flex overflow-auto">
					{seletedDate &&
						data[seletedDate].map((item, index) => {
							const currentWeather = item.weather;
							return <DayWeatherCard key={`day_card_${index}`} temp={item.main.feels_like} icon={currentWeather.at(0).icon} date_txt={item.dt_txt} />;
						})}
				</div>
			</div>
		</GlassCard>
	);
};

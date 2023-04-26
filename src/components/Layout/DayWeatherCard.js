import { getHourString } from "@/Util";
import Image from "next/image";

export const DayWeatherCard = ({ date_txt, description, icon, temp }) => {
	return (
		<div className="flex flex-col w-[100px] justify-center items-center shrink-0">
			<span>{getHourString(new Date(date_txt))}</span>
			<Image width="50" height="50" alt={description} src={`http://openweathermap.org/img/wn/${icon}.png`} />
			<span className="degree">{temp.toFixed(0)}</span>
		</div>
	);
};

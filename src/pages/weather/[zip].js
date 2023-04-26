import { groupWeatherDataByDate } from "@/Util";
import { WeatherCard } from "@/components/Layout/WeatherCard";
import If from "@/components/Util/If";
import { getWeatherAPIUrl } from "@/hooks";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home(data) {
	const router = useRouter();
	if (data == null) return null;

	const mainData = data.list.length ? data.list.at(0).main : null;
	const weather = data.list.length ? data.list.at(0).weather.at(0) : null;
	const city = data.city;
	const processedData = groupWeatherDataByDate(data.list);

	return (
		<main className={`flex min-h-screen flex-col items-center justify-center ${inter.className}`}>
			<Link href="/" className="absolute top-0 right-0 p-5 font-medium">
				Home
			</Link>
			<div className="flex items-center mb-[20px] text-[30px] ">
				<div className="text-[#333] text-center mr-2">Weather Status showing for</div>
				<div className="">{router.query.zip}</div>
			</div>
			<If truth={!!data}>
				<WeatherCard todayWeather={weather} temperatureData={mainData} data={processedData} city={city} />
			</If>
		</main>
	);
}

export async function getServerSideProps(context) {
	const zip = context.query.zip;
	const url = getWeatherAPIUrl(zip);
	let data = null;
	try {
		data = (await fetch(url)).json();
	} catch {
		data = null;
	}
	return {
		props: data,
	};
}

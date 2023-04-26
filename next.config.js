/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "openweathermap.org",
				port: "",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;

/* To maintain cache size with limited to given size */
export const resizeCache = (cache, size = 20) => {
	const length = Object.keys(cache).length;
	if (length <= size) return cache;
	delete cache[Object.keys(cache).at(0)];
	return cache;
};

export const debounce = (fn, delay = 1000) => {
	let timer = null;
	return (e) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.call && fn(e);
		}, delay);
	};
};

export const getHourString = (date) => {
	const hours = date.getHours();
	const ampm = hours >= 12 ? "PM" : "AM";
	const hourInAMPM = hours % 12 || 12;
	return `${hourInAMPM} ${ampm}`;
};

export const groupWeatherDataByDate = (list) => {
	const dateGrp = {};
	list.forEach((item) => {
		const dateString = new Date(item.dt_txt).toDateString();
		dateGrp[dateString] = dateGrp[dateString] ?? [];
		dateGrp[dateString].push(item);
	});
	return dateGrp;
};

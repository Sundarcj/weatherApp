import { debounce } from "@/Util";
import { useState } from "react";

export const InputText = ({ onChange, value, className }) => {
	const [inputValue, setValue] = useState(value);
	const debouncedMethod = debounce(onChange);

	const handleChange = (e) => {
		setValue(e.target.value);
		debouncedMethod(e.target.value);
	};

	return <input type="text" value={inputValue} onChange={handleChange} className={`outline-0 bg-transparent border-0 border-b border-dashed border-green-500 ${className}`} />;
};

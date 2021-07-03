import uuid from "react-uuid";

const KeyValueInput = ({ keyValues, setFormData, name, url }) => {
	const handleChange = (e, ind) => {
		const { name: inputName, value } = e.target;

		const newKeyValues = [
			...keyValues.slice(0, ind),
			{ ...keyValues[ind], [inputName]: value },
			...keyValues.slice(ind + 1),
		];
		if (ind === keyValues.length - 1)
			newKeyValues.push({ key: "", value: "", id: uuid() });

		const newUrl = {};
		if (url !== undefined) {
			const queryParams = newKeyValues.reduce((prev, curr) => {
				const { key, value } = curr;
				if (key === "" && value === "") return prev;
				return prev + `&${key}${value ? `=${value}` : ""}`;
			}, "");
			newUrl.url = `${url.split("?")[0]}?${queryParams}`;
		}
		setFormData(prev => ({ ...prev, ...newUrl, [name]: newKeyValues }));
	};

	const handleRemove = id =>
		setFormData(prev => ({
			...prev,
			[name]: keyValues.filter(ele => ele.id !== id),
		}));
	return (
		<>
			{keyValues.map(({ key, value, id }, ind) => (
				<div key={id} className="grid grid-cols-10 mt-2 group">
					<input
						type="text"
						name="key"
						value={key}
						className="col-span-4 p-2 focus:outline-none border bg-gray-100 border-gray-200 focus:border-gray-300 focus:bg-white rounded-l"
						placeholder="Key"
						onChange={e => handleChange(e, ind)}
					/>
					<input
						type="text"
						name="value"
						value={value}
						className="col-span-4 p-2 focus:outline-none border bg-gray-100 border-gray-200 focus:border-gray-300 focus:bg-white rounded-r"
						placeholder="Value"
						onChange={e => handleChange(e, ind)}
					/>
					{!(ind === keyValues.length - 1) && (
						<button
							className="col-span-2 items-center justify-center text-gray-400 hidden group-hover:flex transition duration-150"
							onClick={() => handleRemove(id)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="gray"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					)}
				</div>
			))}
		</>
	);
};

export default KeyValueInput;

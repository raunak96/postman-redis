const ResponseHeader = ({ headers }) => {
	console.log(headers);
	return (
		<div className="mt-2">
			{Object.entries(headers).map(([key, value]) => (
				<div key={key} className="grid grid-cols-2 text-sm opacity-80">
					<div className="p-2 border border-gray-200">{key}</div>
					<div className="p-2 border border-gray-200">{value}</div>
				</div>
			))}
		</div>
	);
};

export default ResponseHeader;

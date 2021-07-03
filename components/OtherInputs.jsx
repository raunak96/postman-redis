import HeaderItem from "./HeaderItem";

const OtherInputs = () => {
	return (
		<header className="mt-4 flex space-x-6">
			<HeaderItem title="Query Params" />
			<HeaderItem title="Headers" />
			<HeaderItem title="JSON" />
		</header>
	);
};

export default OtherInputs;

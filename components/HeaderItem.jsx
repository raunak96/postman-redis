const HeaderItem = ({ title, active = false, handleClick }) => {
	return (
		<span
			className={`opacity-70 py-2 cursor-pointer hover:opacity-90 text-sm ${
				active ? "opacity-90 border-b-4 border-red-400" : ""
			}`}
			onClick={handleClick}>
			{title}
		</span>
	);
};

export default HeaderItem;

import { useContext, useRef, useState } from "react";
import { ResponseContext } from "../context/ResponseContext";
import HeaderItem from "./HeaderItem";
import JsonEditor from "./JsonEditor";
import ResponseHeader from "./ResponseHeader";

const style = status => {
	if (status < 300) return "text-green-600";
	if (status < 400) return "text-yellow-500";
	return "text-red-500";
};

const ResponseSection = () => {
	const [selectedHeader, setSelectedHeader] = useState(1);
	const { responseData } = useContext(ResponseContext);

	const viewerRef = useRef(null);

	return (
		<div className="mt-3 h-1/2 flex flex-col border-t border-gray-200 pt-2">
			<h1 className="text-gray-500">Response</h1>
			{Object.keys(responseData).length > 0 && (
				<>
					<header className="flex justify-between">
						<div className="flex space-x-6">
							<HeaderItem
								title="Body"
								active={selectedHeader === 1}
								handleClick={() => setSelectedHeader(1)}
							/>
							<HeaderItem
								title={`Headers (${
									Object.keys(responseData.headers).length
								})`}
								active={selectedHeader === 2}
								handleClick={() => setSelectedHeader(2)}
							/>
						</div>
						<div className="flex space-x-2">
							<div className="text-xs text-gray-500">
								Status:{" "}
								<span className={style(responseData.status)}>
									{responseData.status}
								</span>
							</div>
							<div className="text-xs text-gray-500">
								Time:{" "}
								<span className={style(responseData.status)}>
									{responseData.time} ms
								</span>{" "}
							</div>
							<div className="text-xs text-gray-500">
								Size:{" "}
								<span className={style(responseData.status)}>
									{responseData.size}
								</span>
							</div>
						</div>
					</header>
					<div className="flex-1 mt-2">
						{selectedHeader === 1 && (
							<JsonEditor
								defaultValue={responseData.body}
								readOnly={true}
								className="max-h-52"
								ref={viewerRef}
							/>
						)}
						{selectedHeader === 2 && (
							<ResponseHeader headers={responseData.headers} />
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default ResponseSection;

import { useContext, useRef, useState } from "react";
import HeaderItem from "./HeaderItem";
import KeyValueInput from "./KeyValueInput";
import uuid from "react-uuid";
import JsonEditor from "./JsonEditor";
import axios from "axios";
import { ResponseContext } from "../context/ResponseContext";
// eslint-disable-next-line no-unused-vars
import * as util from "../util";
import prettyBytes from "pretty-bytes";

const RequestForm = () => {
	const [formData, setFormData] = useState({
		method: "GET",
		url: "",
		queryParams: [{ key: "", value: "", id: uuid() }],
		headers: [{ key: "", value: "", id: uuid() }],
	});

	// 1- QueryParams, 2-Header, 3-JSON
	const [selectedHeader, setSelectedHeader] = useState(1);

	const { method, url, queryParams, headers } = formData;

	const { setResponseData } = useContext(ResponseContext);

	const editorRef = useRef(null);

	const handleChange = e => {
		const { name, value } = e.target;

		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		if (!url) return;

		try {
			const data = JSON.parse(editorRef?.current?.getValue());

			const res = await axios({
				method,
				url,
				headers: headers.reduce((pre, { key, value }) => {
					if (!key) return pre;
					return { ...pre, [key]: value };
				}, {}),
				data,
			});
			setResponseData({
				body: JSON.stringify(res.data, null, 2),
				headers: res.headers,
				status: parseInt(res.status),
				time: res.customData.time,
				// JSON stringify gives string and each char in string is 1 byte so we can get total size
				// from number of characters
				size: prettyBytes(
					JSON.stringify(res.data).length +
						JSON.stringify(res.headers).length
				),
			});
		} catch (error) {
			console.log(error.response);
			setResponseData({
				body: JSON.stringify(error?.response?.data ?? {}, null, 2),
				headers: error?.response?.headers ?? {},
				status: parseInt(error?.response?.status ?? 500),
				time: error.response.customData.time,
				size: prettyBytes(
					JSON.stringify(error.response.data).length +
						JSON.stringify(error.response.headers).length
				),
			});
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col h-1/2">
			<div className="grid grid-cols-12">
				<select
					value={method}
					name="method"
					onChange={handleChange}
					className="col-span-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 focus:bg-white border border-gray-300 focus:outline-none focus:border-blue-300 rounded-l">
					<option value="GET">GET</option>
					<option value="POST">POST</option>
					<option value="PUT">PUT</option>
					<option value="PATCH">PATCH</option>
					<option value="DELETE">DELETE</option>
				</select>
				<input
					className="col-span-8 px-3 py-2 bg-gray-100 hover:bg-gray-200 focus:bg-white border border-gray-300 focus:outline-none focus:border-blue-300 rounded-r"
					type="url"
					name="url"
					value={url}
					onChange={handleChange}
				/>
				<button
					type="submit"
					className="py-2 px-1 col-span-2 bg-blue-600 hover:bg-blue-700 text-white ml-3 rounded">
					Send
				</button>
			</div>
			<header className="mt-4 flex space-x-6">
				<HeaderItem
					title="Query Params"
					active={selectedHeader === 1}
					handleClick={() => setSelectedHeader(1)}
				/>
				<HeaderItem
					title="Headers"
					active={selectedHeader === 2}
					handleClick={() => setSelectedHeader(2)}
				/>
				<HeaderItem
					title="JSON"
					active={selectedHeader === 3}
					handleClick={() => setSelectedHeader(3)}
				/>
			</header>
			<div
				className={`mt-3 flex-1 ${
					selectedHeader !== 3 ? "overflow-auto" : "overflow-hidden"
				}`}>
				{selectedHeader === 1 && (
					<KeyValueInput
						keyValues={queryParams}
						setFormData={setFormData}
						name="queryParams"
						url={url}
					/>
				)}
				{selectedHeader === 2 && (
					<KeyValueInput
						keyValues={headers}
						setFormData={setFormData}
						name="headers"
					/>
				)}
				<JsonEditor
					className={`max-h-52 ${
						selectedHeader === 3 ? "block h-full" : "hidden h-0 w-0"
					}`}
					height={selectedHeader !== 3 ? 0 : undefined}
					ref={editorRef}
				/>
			</div>
		</form>
	);
};

export default RequestForm;

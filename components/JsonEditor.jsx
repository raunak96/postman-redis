import Editor from "@monaco-editor/react";
import { forwardRef } from "react";

const JsonEditor = (
	{ defaultValue = `{\n\t\n}`, className, readOnly = false, height },
	ref
) => {
	const handleEditorDidMount = editor => (ref.current = editor);
	return (
		<Editor
			language="json"
			onMount={handleEditorDidMount}
			theme="light"
			className={`border border-gray-300 shadow-md rounded ${className}`}
			options={{ readOnly }}
			height={height}
			value={defaultValue}
		/>
	);
};

export default forwardRef(JsonEditor);

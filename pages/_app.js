import "tailwindcss/tailwind.css";
import ResponseProvider from "../context/ResponseContext";

function MyApp({ Component, pageProps }) {
	return (
		<ResponseProvider>
			<Component {...pageProps} />
		</ResponseProvider>
	);
}

export default MyApp;

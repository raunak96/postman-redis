import axios from "axios";

axios.interceptors.request.use(request => {
	request.customData = request.customData || {};
	request.customData.startTime = new Date().getTime();
	return request;
});

axios.interceptors.response.use(
	response => {
		response.customData = response.customData || {};
		response.customData.time =
			new Date().getTime() - response.config.customData.startTime;
		return response;
	},
	error => {
		error.response.customData = error.response.customData || {};
		error.response.customData.time =
			new Date().getTime() - error.response.config.customData.startTime;
		return Promise.reject(error);
	}
);

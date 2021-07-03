import axios from "axios";
import { getOrSetCache } from "../../../Redis/redis";

export default async function handler(req, res) {
	try {
		const KEY = `photo:${req.query.id}`;

		const data = await getOrSetCache(KEY, async () => {
			const { data } = await axios.get(
				`https://jsonplaceholder.typicode.com/photos/${req.query.id}`
			);
			return data;
		});
		return res.json(data);
	} catch (error) {
		res.status(error.response.status).json(error);
	}
}

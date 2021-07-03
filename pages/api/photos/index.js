import axios from "axios";
import { getOrSetCache } from "../../../Redis/redis";

export default async function handler(req, res) {
	try {
		const albumId = req.query.albumId;

		const KEY = albumId ? `photos?albumId=${albumId}` : "photos";

		const data = await getOrSetCache(KEY, async () => {
			const { data } = await axios.get(
				"https://jsonplaceholder.typicode.com/photos",
				{
					params: { albumId },
				}
			);
			return data;
		});
		return res.json(data);
	} catch (error) {
		res.status(error?.response?.status ?? 500).json(error);
	}
}

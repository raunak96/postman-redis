import Redis from "ioredis";

const DEFAUT_EXP = 3600; //1hr

export const connectToRedis = () => {
	const redis = new Redis(process.env.REDIS_URL);
	return redis;
};

export const getOrSetCache = (key, cb) => {
	return new Promise(async (resolve, reject) => {
		const redis = connectToRedis();
		try {
			const cachedData = await redis.get(key);
			if (cachedData != null) {
				console.log("CACHE HIT");
				return resolve(JSON.parse(cachedData));
			} else {
				console.log("CACHE MISS");
				const freshData = await cb();
				redis.setex(key, DEFAUT_EXP, JSON.stringify(freshData));
				resolve(freshData);
			}
		} catch (error) {
			reject(error);
		}
	});
};

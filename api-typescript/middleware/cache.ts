import { Request, Response, NextFunction } from 'express';
import * as redis from 'redis';

const portRedis = '6379';

const redisClient = redis.createClient(portRedis);

const isCached = (req: Request, res: Response, next: NextFunction) => {
    const key = req.params.id
    console.log(key)

    redisClient.get(key, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        if (data !== null) {
            console.log("Found it in Redis")
            console.log(key)
            res.send(key)
        } else {
            console.log("Book not found");
            console.log(key)
            next();
        }
    });
};

export default isCached;

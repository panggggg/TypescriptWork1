import { Request, Response, NextFunction } from 'express';
import { send } from 'process';
import * as redis from 'redis';

const portRedis = '6379';

const redisClient = redis.createClient(portRedis);

redisClient.on("error", (error) => {
    console.log(error)
});

redisClient.set("redis", "test", redis.print)
redisClient.get("redis", redis.print)

const isCached = (req: Request, res: Response, next: NextFunction): void => {
    const idBook = req.params.id;
    console.log(idBook)

    redisClient.get(idBook, (err, data) => {
        console.log(data)
        if (data !== null) {
            console.log(data)
            console.log("From cache")
            res.send(data)
        } else {
            console.log("Pass")
            next();
        }
    })

};

export default isCached;

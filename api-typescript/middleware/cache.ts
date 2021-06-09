import { json } from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import * as redis from 'redis';

const portRedis = '6379';

const redisClient = redis.createClient(portRedis);

redisClient.set("acb", "picc")
const isCached = (req: Request, res: Response, next: NextFunction) => {
    const myJSON = JSON.stringify(req.body)
    const myObj = JSON.parse(myJSON)
    const title = myObj["title"]
    console.log(title)

    redisClient.get(title, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        if (data !== null) {
            console.log("Found it in Redis")
            console.log(title)
            res.send(title)
        } else {
            console.log("Book not found");
            redisClient.set(title, req.body, (err, reply) => {
                if (reply === "OK") {
                    console.log(reply)
                }
            })
            console.log(title)
            next();
        }
    });
};

export default isCached;

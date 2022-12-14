import { Request, Response } from "express";
import { Pin } from "../models/pin.model";


const addPin = (req: Request, res: Response) => {
    const newPin = new Pin({
        username: req.body.username,
        title: req.body.title,
        desc: req.body.desc,
        rating: req.body.rating,
        long: req.body.long,
        lat: req.body.lat,
    });
    newPin.save((err, pin) => {
        if (err) {
            res.status(500).send({ message: err});
        }else{
            res.status(200).send({
                username: pin.username,
                title: pin.title,
                desc: pin.desc,
                rating: pin.rating,
                long: pin.long,
                lat: pin.lat
            });
        }
    }) 
};

const getPin = (req: Request, res: Response) => {
    Pin.find((err, pin) => {
        if (err) {
            res.status(500).send({message: err});
        }else{
            res.status(200).send(pin);
        }
    })
};

export const controller = {
    addPin,
    getPin
}
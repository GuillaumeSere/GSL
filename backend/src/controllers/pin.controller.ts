import { Request, Response } from "express";
import { Pin } from "../models/pin.model";
import * as express from "express";

const router = express.Router();

// create pin
const addPin = router.post("/", async (req: Request, res: Response) => {
    const newPin = new Pin(req.body);
    try {
      const savedPin = await newPin.save();
      res.status(200).json(savedPin);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // get all pins
const getPin = router.get("/", async (req: Request, res: Response) => {
    try {
      const pins = await Pin.find();
      res.status(200).json(pins);
    } catch (err) {
      res.status(500).json(err);
    }
  });

export const controller = {
    addPin,
    getPin
}
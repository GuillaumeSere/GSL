import { controller } from "../controllers/pin.controller";
import { NextFunction, Request, Response } from "express";

module.exports = function(app: any):void {
    app.use(function(req: Request, res: Response, next: NextFunction) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    //create a pin
    app.post("/api/test/pin",controller.addPin);

    //get all pins
    app.get("/api/test/pin",controller.getPin);

}
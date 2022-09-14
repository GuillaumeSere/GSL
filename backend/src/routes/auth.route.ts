import  { verifySignUp }  from "../middleware/verifySignUp";
import { controller } from "../controllers/auth.controller";
import { NextFunction, Response } from "express";

module.exports = function(app:any):void {
  app.use(function(req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.post("/api/auth/signin", controller.signin);
};
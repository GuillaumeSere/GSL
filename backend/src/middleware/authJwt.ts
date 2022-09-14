import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config }from "../config/auth.config";
import { db } from "../models";

const User = db.user;
const Role = db.role;

interface IDecode {
    address: string,
    role: string,
    iat: number,
    exp: number,
    token: string
  };

 interface RequestWithUserRole extends Request {
    userId?: IDecode,
}

const verifyToken = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  // @ts-ignore
  jwt.verify(token, config.secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user?.roles }
      },
      (err: any, roles: any) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

const isModerator = (req:RequestWithUserRole, res:Response, next:NextFunction) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user?.roles }
      },
      (err: any, roles: string | any[]) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

export const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};


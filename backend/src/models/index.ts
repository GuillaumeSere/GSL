import mongoose from 'mongoose';
import { User } from './user.model';
import { Role } from './role.model';
import { Pin } from './pin.model';

mongoose.Promise = global.Promise;

 export const db = {
    mongoose: mongoose,
    user: User,
    role: Role,
    pin: Pin,
    ROLES: ["user", "admin", "moderator"]
 };



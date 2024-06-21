import { Request } from "express";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  token?: string;
};

export interface UserRequest extends Request {
  user?: User;
}

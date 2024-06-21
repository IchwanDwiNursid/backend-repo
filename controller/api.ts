import { NextFunction, Request, Response } from "express";
import { RegisterRequest, UpdateRequest } from "../model/model.user";
import { UserService } from "../service/userService";
import { UserRequest } from "../model/user.request";

export class ControllerUser {
  static async REGISTER(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterRequest = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        token: "null",
      };

      const result = await UserService.register(request);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async LOGIN(req: Request, res: Response, next: NextFunction) {
    try {
      const request = {
        email: req.body.email,
        password: req.body.password,
      };
      const result = await UserService.login(request);

      res.cookie("refresh_token", result.token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        data: "Login Succesfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async GET(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.getAll();

      res.status(200).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async GETBYID(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      const result = await UserService.getById(id);
      res.status(200).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async UPDATE(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const request: UpdateRequest = req.body;
      const result = await UserService.Update(user!, request);

      res.cookie("refresh_token", result.token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        data: {
          id: result.id,
          name: result.name,
          email: result.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async LOGOUT(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      await UserService.Logout(user!);

      res.clearCookie("refresh_token");

      res.status(200).json({
        data: "Logout Succesfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

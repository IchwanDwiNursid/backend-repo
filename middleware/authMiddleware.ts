import { NextFunction, Response } from "express";
import { User, UserRequest } from "../model/user.request";
import { getByField } from "../repository/userCollection";
import jwt from "jsonwebtoken";

export const AuthMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({
      errors: "Unauthorized",
    });
  }

  const user = await getByField("token", refreshToken);

  if (user == "[]") {
    return res.status(403).json({
      errors: "Forbiden",
    });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as jwt.JwtPayload;

    req.user = decoded as User;
    next();
  } catch (error) {
    res.status(401).json({
      errors: error,
    });
  }
};

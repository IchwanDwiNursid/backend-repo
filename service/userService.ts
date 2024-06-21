import argon2 from "argon2";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UpdateRequest,
  UpdateResponse,
  UserResponse,
} from "../model/model.user";
import {
  getByField,
  getById,
  getMultipleData,
  updateData,
  updateToken,
  uploadData,
} from "../repository/userCollection";
import { UserValidation } from "../validation/userValidation";
import { Validation } from "../validation/validation";
import { ResponseError } from "../entities/ApiError";
import jwt from "jsonwebtoken";
import { User } from "../model/user.request";

export class UserService {
  static async register(req: RegisterRequest): Promise<UserResponse> {
    const request = await Validation.validate(UserValidation.REGISTER, req);

    console.log("===========>" + process.env.FB_API_KEY);

    let checkUser = await getByField("email", request.email);

    if (checkUser != "[]") {
      throw new ResponseError(404, "User Already Exist");
    }

    request.password = await argon2.hash(request.password);

    await uploadData(request);

    checkUser = await getByField("email", request.email);
    const result = JSON.parse(checkUser);

    return result.map((e: any) => {
      return {
        id: e.id,
        name: e.name,
        email: e.email,
      };
    });
  }

  static async login(req: LoginRequest): Promise<LoginResponse> {
    const request = await Validation.validate(UserValidation.LOGIN, req);

    // check duplicate user

    const checkUser = await getByField("email", request.email);

    if (checkUser == "[]") {
      throw new ResponseError(400, "Email Or Password Wrong");
    }

    const dataParser = JSON.parse(checkUser);

    const match = await argon2.verify(dataParser[0].password, request.password);

    if (!match) {
      throw new ResponseError(400, "Email Or Password Wrong");
    }

    //jwt configure

    const refreshToken = jwt.sign(
      {
        id: dataParser[0].id,
        name: dataParser[0].name,
        email: dataParser[0].email,
      },

      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    await updateToken(dataParser[0].id, refreshToken);

    return {
      token: refreshToken,
    };
  }

  static async getAll() {
    const users = await getMultipleData();

    return users.map((e: any) => {
      return {
        id: e.id,
        name: e.name,
        email: e.email,
      };
    });
  }

  static async getById(id: string): Promise<UserResponse> {
    const user = await getById(id);

    if (user.name == null) {
      throw new ResponseError(404, "User Not Found");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  static async Update(user: User, req: UpdateRequest): Promise<UpdateResponse> {
    const request = await Validation.validate(UserValidation.UPDATE, req);

    if (request.password) {
      request.password = await argon2.hash(request.password);
    }

    let checkUser = await getByField("email", request.email);

    if (checkUser != "[]") {
      throw new ResponseError(404, "Email Already Exist");
    }

    await updateData(user.id, request);

    const getData = await getById(user.id);

    const refreshToken = jwt.sign(
      {
        id: getData.id,
        name: getData.name,
        email: getData.email,
      },

      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    await updateToken(user.id, refreshToken);

    return {
      id: getData.id,
      name: getData.name,
      email: getData.email,
      token: refreshToken,
    };
  }

  static async Logout(user: User) {
    await updateToken(user.id, "null");
  }
}

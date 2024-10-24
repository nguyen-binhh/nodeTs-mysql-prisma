import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../main";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignupSchema } from "../schema/users";

// Signup
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    SignupSchema.parse(req.body)
    const { email, password, name } = req.body;

    // checking user axist
    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
      next(
        new BadRequestsException(
          "User already exists!!",
          ErrorCodes.USER_ALREADY_EXISTS
        )
      );
    }
    user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });
    res.json(user);
  } catch (error: any) {
    next(
      new UnprocessableEntity(
        error?.issues,
        "Unprocessable entity",
        ErrorCodes.UNPROCESSABLE_ENTITY
      )
    );
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // checking user axist
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw Error("User already exists!!");
  }
  if (!compareSync(password, user.password)) {
    throw Error("Incorrect Password!");
  }
  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.json({ user, token });
};

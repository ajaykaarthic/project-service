import Joi from "joi";
import { userRequest } from "model/userTypes";

export const newUser = (req: userRequest) => {
  const newUserSchema = Joi.object<userRequest>({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required(),
    password: Joi.string().min(8).max(24).required(),
  });
  return newUserSchema.validate(req);
};

export const loginUser = (req: { email: string; password: string }) => {
  const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(24).required(),
  });
  return loginUserSchema.validate(req);
};

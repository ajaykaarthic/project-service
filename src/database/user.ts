import { db } from "../utils/db_server";
import { user } from "../model/userTypes";

export const getUserByEmail = async (email: string): Promise<user | null> => {
  return db.user.findUnique({ where: { email } });
};

export const createUser = async (
  user: Omit<user, "uid">
): Promise<Omit<user, "saltedPassword" | "sessionToken" | "salt">> => {
  return db.user.create({
    data: user,
    select: {
      uid: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      address: true,
      saltedPassword: false,
      sessionToken: false,
      salt: false,
    },
  });
};

export const updateUserSession = async (
  user: user
): Promise<Omit<user, "saltedPassword" | "salt">> => {
  return db.user.update({
    where: { uid: user.uid },
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      sessionToken: user.sessionToken,
    },
    select: {
      uid: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      address: true,
      saltedPassword: false,
      sessionToken: true,
      salt: false,
    },
  });
};

export const getUserBySessionToken = async (
  sessionToken: string
): Promise<user | null> => {
  return db.user.findFirst({ where: { sessionToken } });
};

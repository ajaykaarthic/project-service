export type user = {
  uid: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  saltedPassword: string;
  sessionToken: string;
  salt: string;
};

export type userRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
};

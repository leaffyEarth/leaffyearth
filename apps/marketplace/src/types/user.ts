export interface IUserData {
  uid: string;
  email: string;
  name: string;
  role: string;
  dob: string;
  gender: string;
}

export interface ICreateUserRequest {
  uid: string;
  email: string;
  name: string;
  role: string;
  dob: string;
  gender: string;
}

export interface IGetUserResponse {
  uid: string;
  email: string;
  name: string;
  role: string;
  dob: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserError {
  message: string;
  code: string;
  status: number;
}

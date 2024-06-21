export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  token?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type UserResponse = {
  name: string;
  email: string;
  id: string;
};

export type UpdateRequest = {
  name?: string;
  email?: string;
  password?: string;
};

export type UpdateResponse = {
  name: string;
  email: string;
  id: string;
  token?: string;
};

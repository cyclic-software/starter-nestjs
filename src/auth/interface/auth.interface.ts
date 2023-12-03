export interface Login {
  email: string;
  password: string;
}

export interface payloadToken {
  email: string;
  id: number;
}

export interface returnLogin {
  id: number;
  email: string;
  accessToken: string;
  refreshToken: string;
}

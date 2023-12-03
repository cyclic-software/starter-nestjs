export interface CommonResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  timestamp?: Date;
}

import { CommonResponse } from './interface/response.interface';

export class ResponseHelper {
  static success<T>(data: T, message?: string): CommonResponse<T> {
    return {
      success: true,
      data,
      message,
      timestamp: new Date(),
    };
  }

  static error(message?: string): CommonResponse<null> {
    return { success: false, message, timestamp: new Date() };
  }
}

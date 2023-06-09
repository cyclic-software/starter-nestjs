import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const res = exception.getResponse();
    let message =
      typeof res === 'string'
        ? res
        : Array.isArray(res.message)
        ? res.message[0]
        : res.message;

    if (res.code) {
      message = 'Data related to ';
      switch (res.code) {
        case 11000:
          const arr = Object.keys(res.keyValue);
          arr.forEach((el, i) => {
            message = message + el;
            if (i !== arr.length - 1) {
              message = message + ',';
            }
          });
          break;

        default:
          message = exception.response?.message?.[0];
          break;
      }
      message = message + ' is already in use';
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      data: null,
    });
  }
}

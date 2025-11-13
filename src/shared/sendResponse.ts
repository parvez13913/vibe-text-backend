import { Response } from "express";

type IApiRespone<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: IApiRespone<T>): void => {
  const responseData: IApiRespone<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
    meta: data.meta || null || undefined,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;

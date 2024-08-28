import logger from './logger';

export type ResultType = {
  code: number; // 0 is success
  message?: string;
  result?: any;
};

export default class Result {
  static success<T>(data: T): ResultType {
    return { code: 0, result: data || null };
  }

  static fail(error: any): ResultType {
    logger.error(error);
    if (typeof error.code === 'number') {
      return { code: error.code, message: error.message };
    }
    return { code: 50000, message: error.toString() };
  }
}

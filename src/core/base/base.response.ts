import { Error } from './error';

export class BaseResponse<T> {
  public data: T;
  public success: boolean;
  public message: string;
  public err: Error;

  constructor() {
    this.err = new Error();
  }
}

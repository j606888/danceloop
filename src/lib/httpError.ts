export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

export function raise(status: number, message: string): never {
  throw new HttpError(status, message);
}

export interface IError {
  status: number;
  data: {
    success: boolean;
    statusCode: number;
    message: string;
    timestamp: string;
  };
}

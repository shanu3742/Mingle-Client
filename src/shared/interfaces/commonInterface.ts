import { AxiosError } from "axios";

export interface ServerErrorInterface{
    errorMessage:string;
    error:AxiosError;
}
export interface UserInterface {
    email: string;
    name: string;
    userId: string;
    isFullDetais: boolean;
  }
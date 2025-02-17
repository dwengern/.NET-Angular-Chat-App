export interface APIResponse<T> {
    isSuccess:boolean;
    data:T;
    error:string;
    message:string;
}
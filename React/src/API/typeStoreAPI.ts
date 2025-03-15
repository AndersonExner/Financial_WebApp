export interface ResponseAPI {
    success: boolean,
    message: string,
    data: any
}

export interface User {
    id: string,
    email: string,
    password: string
}
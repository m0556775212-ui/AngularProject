
export interface UserDetails {
    user: User;
    token: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister {
    name: string;
    email: string;
    password: string;
}

export interface User {
    id: number,
    name: string,
    email: string,
    role: string
}
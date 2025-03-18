export interface RequestWithCookies extends Request {
    cookies: Record<string, null>;
}


export interface UserPayload {
    email: string;
    role: string;
}

export interface RequestWithUser extends Request {
    user: UserPayload;
}
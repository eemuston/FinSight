export interface NewUser {
    username: string,
    password: string,
    name?: string
}

export interface NewLogin {
    username: string,
    password: string
}

declare global {
    namespace Express {
        interface Request {
            token?: string | null
            user?: any
        }
    }
}

export interface DecodedToken {
    id: string
    username: string
}
export type RegisterPayload = {email: string, password: string, name: string}
export type LoginPayload = Pick<RegisterPayload, 'password' | 'email'>
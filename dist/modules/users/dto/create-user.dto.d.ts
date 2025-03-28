export declare class CreateUserDto {
    id: number;
    first_name: string;
    last_name?: string;
    email: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}
export declare class LoginDto {
    email: string;
    password: string;
}

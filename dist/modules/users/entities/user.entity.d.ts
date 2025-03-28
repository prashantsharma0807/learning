export declare class Users {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    image: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    hashPassword(): Promise<void>;
}

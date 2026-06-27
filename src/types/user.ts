export interface User {
    user_id: string;
    name: string;
    email?: string | null;
    phone?: string;
    city?: string;
    address?: string;
    date_of_birth?: string;
    gender?: string;
    bio?: string;
    profile_picture?: string;
    registration_date?: string;
    profile_complete?: boolean;
    missing_fields?: string[];
    [key: string]: string | boolean | string[] | undefined | null;
}
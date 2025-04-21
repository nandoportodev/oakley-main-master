export interface Moment {
    id?: string;
    title: string;
    description: string;
    image: string;
    created_at?: string;
    update_at?: string;
    comments?: [{ text: string, username: string }];
}
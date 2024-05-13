export interface UserSession {
    user_id: string;
    email: string;
    activated: boolean;
    session_started_at: number;
}
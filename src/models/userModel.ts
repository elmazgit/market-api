export interface User {
    id: string; // Assuming the ID is a string
    auth_provider_id: string;
    firstname?: string;
    lastname?: string;
    email: string;
    user_image?: string;
    auth_provider: string;
    created_at: Date;
    updated_at: Date;
  }
  
export type User = {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserPreview = Pick<User, "id" | "email" | "name">;

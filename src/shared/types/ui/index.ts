export type SortDirection = "asc" | "desc";

export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

export type FormField = {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "password" | "select" | "textarea";
  placeholder?: string;
  required?: boolean;
};

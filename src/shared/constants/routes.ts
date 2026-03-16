export const ROUTES = {
  home: "/",
  pricing: "/pricing",

  // Flat aliases for simplicity (P1)
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  ADMIN: "/admin",

  auth: {
    login: "/login",
    register: "/register",
    forgot: "/forgot-password",
  },

  dashboard: {
    root: "/dashboard",
    home: "/dashboard",
    numbers: "/dashboard/numbers",
    number: (id: string) => `/dashboard/numbers/${id}` as const,
    orders: "/dashboard/orders",
    order: (id: string) => `/dashboard/orders/${id}` as const,
    settings: "/dashboard/settings",
    account: "/dashboard/account"
  },

  api: {
    numbers: "/api/numbers",
    number: (id: string) => `/api/numbers/${id}` as const,
    orders: "/api/orders",
    userHome: "/api/user-home",
    webhooks: {
      stripe: "/api/webhooks/stripe",
    },
  },
} as const;

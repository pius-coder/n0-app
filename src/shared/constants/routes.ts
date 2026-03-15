export const ROUTES = {
  home: "/",
  pricing: "/pricing",

  auth: {
    login: "/login",
    register: "/register",
    forgot: "/forgot-password",
  },

  dashboard: {
    root: "/numbers",
    numbers: "/numbers",
    number: (id: string) => `/numbers/${id}` as const,
    orders: "/orders",
    order: (id: string) => `/orders/${id}` as const,
    settings: "/settings",
  },

  api: {
    numbers: "/api/numbers",
    number: (id: string) => `/api/numbers/${id}` as const,
    orders: "/api/orders",
    webhooks: {
      stripe: "/api/webhooks/stripe",
    },
  },
} as const;

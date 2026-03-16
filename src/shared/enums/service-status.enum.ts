export const ServiceStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
} as const;

export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus];

export const ServerStatus = {
  ONLINE: "online",
  OFFLINE: "offline",
  MAINTENANCE: "maintenance",
} as const;

export type ServerStatus = (typeof ServerStatus)[keyof typeof ServerStatus];

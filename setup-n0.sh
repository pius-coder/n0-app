#!/bin/bash

# ╔══════════════════════════════════════════════════════════════╗
# ║                    _n0 — Project Setup CLI                   ║
# ║           Transform Next.js base into _n0 architecture       ║
# ╚══════════════════════════════════════════════════════════════╝

set -e

# ── Colors ──────────────────────────────────────────────────────

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

# ── Helpers ─────────────────────────────────────────────────────

step_count=0
total_steps=9

step() {
  step_count=$((step_count + 1))
  echo ""
  echo -e "${PURPLE}${BOLD}[$step_count/$total_steps]${NC} ${CYAN}$1${NC}"
  echo -e "${DIM}─────────────────────────────────────────────${NC}"
}

info() { echo -e "  ${BLUE}ℹ${NC}  $1"; }
success() { echo -e "  ${GREEN}✓${NC}  $1"; }
warn() { echo -e "  ${YELLOW}⚠${NC}  $1"; }
error() { echo -e "  ${RED}✗${NC}  $1"; exit 1; }

create_file() {
  local file_path=$1
  mkdir -p "$(dirname "$file_path")"
  cat > "$file_path"
  success "$(echo "$file_path" | sed 's|^\./||')"
}

create_dir() {
  mkdir -p "$1"
}

# ── Banner ──────────────────────────────────────────────────────

echo ""
echo -e "${BOLD}"
echo "        ___  ____  "
echo "       / _ \\|___ \\ "
echo "  _ _ | | | | __) |"
echo " | '_|| |_| |/ __/ "
echo " |_|   \\___/|_____|"
echo ""
echo -e "${NC}${DIM}  Project Architecture Setup${NC}"
echo ""

# ════════════════════════════════════════════════════════════════
# STEP 1 — Vérifications
# ════════════════════════════════════════════════════════════════

step "Vérification du projet"

if [ ! -f "package.json" ]; then
  error "package.json introuvable. Lance ce script à la racine de ton projet Next.js."
fi

if [ ! -f "next.config.ts" ] && [ ! -f "next.config.mjs" ] && [ ! -f "next.config.js" ]; then
  error "Ce n'est pas un projet Next.js."
fi

if [ ! -d "app" ]; then
  error "Dossier app/ introuvable. Assure-toi d'avoir initialisé Next.js avec App Router."
fi

success "Projet Next.js détecté"

# Vérifier le package manager
if command -v pnpm &> /dev/null; then
  PM="pnpm"
elif command -v yarn &> /dev/null; then
  PM="yarn"
else
  PM="npm"
fi

success "Package manager: ${PM}"

# ════════════════════════════════════════════════════════════════
# STEP 2 — Installation des dépendances
# ════════════════════════════════════════════════════════════════

step "Installation des dépendances"

info "Installation des dépendances de production..."

$PM add zod zustand class-variance-authority clsx tailwind-merge

success "zod (validation)"
success "zustand (state management)"
success "class-variance-authority (component variants)"
success "clsx + tailwind-merge (classNames)"

# ════════════════════════════════════════════════════════════════
# STEP 3 — Création de l'arborescence
# ════════════════════════════════════════════════════════════════

step "Création de l'arborescence"

# ── src/shared ──
create_dir "src/shared/types/entities"
create_dir "src/shared/types/api"
create_dir "src/shared/types/ui"
create_dir "src/shared/schemas"
create_dir "src/shared/utils/string"
create_dir "src/shared/utils/number"
create_dir "src/shared/utils/date"
create_dir "src/shared/utils/array"
create_dir "src/shared/constants"
create_dir "src/shared/enums"

# ── src/server ──
create_dir "src/server/db/schema"
create_dir "src/server/db/queries"
create_dir "src/server/db/seed"
create_dir "src/server/services"
create_dir "src/server/adapters/stripe"
create_dir "src/server/adapters/email/templates"
create_dir "src/server/actions"
create_dir "src/server/middleware"
create_dir "src/server/errors"
create_dir "src/server/helpers"

# ── src/client ──
create_dir "src/client/components/ui/button"
create_dir "src/client/components/ui/input"
create_dir "src/client/components/ui/card"
create_dir "src/client/components/ui/badge"
create_dir "src/client/components/ui/modal"
create_dir "src/client/components/ui/skeleton"
create_dir "src/client/components/ui/toast"
create_dir "src/client/components/common/search-bar"
create_dir "src/client/components/common/pagination"
create_dir "src/client/components/common/empty-state"
create_dir "src/client/components/common/error-boundary"
create_dir "src/client/components/common/status-badge"
create_dir "src/client/components/features/numbers"
create_dir "src/client/components/features/orders"
create_dir "src/client/components/features/auth"
create_dir "src/client/components/features/checkout"
create_dir "src/client/components/features/settings"
create_dir "src/client/components/features/landing"
create_dir "src/client/components/layout/header"
create_dir "src/client/components/layout/sidebar"
create_dir "src/client/components/layout/footer"
create_dir "src/client/hooks/common"
create_dir "src/client/hooks/features"
create_dir "src/client/providers"
create_dir "src/client/stores"
create_dir "src/client/lib"

# ── src/packages ──
create_dir "src/packages/result"
create_dir "src/packages/phone"
create_dir "src/packages/api-client"
create_dir "src/packages/logger"

# ── app (restructure) ──
create_dir "app/(marketing)"
create_dir "app/(auth)/login"
create_dir "app/(auth)/register"
create_dir "app/(dashboard)/numbers/[id]"
create_dir "app/(dashboard)/orders"
create_dir "app/(dashboard)/settings"
create_dir "app/api/numbers/[id]"
create_dir "app/api/orders"
create_dir "app/api/webhooks/stripe"

success "Arborescence créée ($(find src -type d | wc -l) dossiers)"

# ════════════════════════════════════════════════════════════════
# STEP 4 — Fichiers PACKAGES
# ════════════════════════════════════════════════════════════════

step "Fichiers packages/"

# ── Result ──

create_file "src/packages/result/result.ts" << 'EOF'
export type Result<T, E = Error> =
  | { ok: true; data: T }
  | { ok: false; error: E };

export function Ok<T>(data: T): Result<T, never> {
  return { ok: true, data };
}

export function Err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export function tryCatch<T>(fn: () => T): Result<T> {
  try {
    return Ok(fn());
  } catch (e) {
    return Err(e instanceof Error ? e : new Error(String(e)));
  }
}

export async function tryCatchAsync<T>(
  fn: () => Promise<T>
): Promise<Result<T>> {
  try {
    const data = await fn();
    return Ok(data);
  } catch (e) {
    return Err(e instanceof Error ? e : new Error(String(e)));
  }
}
EOF

create_file "src/packages/result/index.ts" << 'EOF'
export { Ok, Err, tryCatch, tryCatchAsync } from "./result";
export type { Result } from "./result";
EOF

# ── Phone ──

create_file "src/packages/phone/types.ts" << 'EOF'
export type ParsedPhone = {
  countryCode: string;
  nationalNumber: string;
  raw: string;
  formatted: string;
};

export type Country = {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
};
EOF

create_file "src/packages/phone/parser.ts" << 'EOF'
import type { ParsedPhone } from "./types";

export function parsePhone(raw: string): ParsedPhone | null {
  const cleaned = raw.replace(/[\s\-\(\)]/g, "");
  const match = cleaned.match(/^(\+?\d{1,3})(\d{6,14})$/);

  if (!match) return null;

  return {
    countryCode: match[1],
    nationalNumber: match[2],
    raw,
    formatted: `${match[1]} ${match[2]}`,
  };
}
EOF

create_file "src/packages/phone/validator.ts" << 'EOF'
export function isValidPhone(value: string): boolean {
  const cleaned = value.replace(/[\s\-\(\)]/g, "");
  return /^\+?[1-9]\d{6,14}$/.test(cleaned);
}
EOF

create_file "src/packages/phone/formatter.ts" << 'EOF'
export function formatPhone(value: string): string {
  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
}
EOF

create_file "src/packages/phone/index.ts" << 'EOF'
export { parsePhone } from "./parser";
export { isValidPhone } from "./validator";
export { formatPhone } from "./formatter";
export type { ParsedPhone, Country } from "./types";
EOF

# ── API Client ──

create_file "src/packages/api-client/types.ts" << 'EOF'
export type ClientConfig = {
  baseUrl: string;
  headers?: Record<string, string>;
  onError?: (error: Error) => void;
};

export type RequestOptions = {
  params?: Record<string, string>;
  body?: unknown;
  headers?: Record<string, string>;
};
EOF

create_file "src/packages/api-client/errors.ts" << 'EOF'
export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body?: unknown
  ) {
    super(`API Error ${status}: ${statusText}`);
    this.name = "ApiClientError";
  }
}
EOF

create_file "src/packages/api-client/create-client.ts" << 'EOF'
import type { ClientConfig, RequestOptions } from "./types";
import { ApiClientError } from "./errors";

export function createClient(config: ClientConfig) {
  async function request<T>(
    method: string,
    path: string,
    options?: RequestOptions
  ): Promise<T> {
    const url = new URL(path, config.baseUrl);

    if (options?.params) {
      Object.entries(options.params).forEach(([k, v]) =>
        url.searchParams.set(k, v)
      );
    }

    const res = await fetch(url.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
        ...options?.headers,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) {
      const error = new ApiClientError(res.status, res.statusText);
      config.onError?.(error);
      throw error;
    }

    return res.json() as T;
  }

  return {
    get: <T>(path: string, params?: Record<string, string>) =>
      request<T>("GET", path, { params }),
    post: <T>(path: string, body?: unknown) =>
      request<T>("POST", path, { body }),
    put: <T>(path: string, body?: unknown) =>
      request<T>("PUT", path, { body }),
    patch: <T>(path: string, body?: unknown) =>
      request<T>("PATCH", path, { body }),
    delete: <T>(path: string) => request<T>("DELETE", path),
  };
}
EOF

create_file "src/packages/api-client/index.ts" << 'EOF'
export { createClient } from "./create-client";
export { ApiClientError } from "./errors";
export type { ClientConfig, RequestOptions } from "./types";
EOF

# ── Logger ──

create_file "src/packages/logger/logger.ts" << 'EOF'
type LogLevel = "debug" | "info" | "warn" | "error";

type LogEntry = {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
};

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const LEVEL_COLORS: Record<LogLevel, string> = {
  debug: "\x1b[90m",
  info: "\x1b[36m",
  warn: "\x1b[33m",
  error: "\x1b[31m",
};

const RESET = "\x1b[0m";

export function createLogger(options?: { minLevel?: LogLevel; prefix?: string }) {
  const minLevel = options?.minLevel ?? "debug";
  const prefix = options?.prefix ?? "_n0";

  function log(level: LogLevel, message: string, data?: unknown) {
    if (LEVEL_PRIORITY[level] < LEVEL_PRIORITY[minLevel]) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };

    const color = LEVEL_COLORS[level];
    const tag = `${color}[${prefix}:${level.toUpperCase()}]${RESET}`;

    if (data) {
      console[level === "error" ? "error" : "log"](
        `${tag} ${message}`,
        data
      );
    } else {
      console[level === "error" ? "error" : "log"](`${tag} ${message}`);
    }

    return entry;
  }

  return {
    debug: (msg: string, data?: unknown) => log("debug", msg, data),
    info: (msg: string, data?: unknown) => log("info", msg, data),
    warn: (msg: string, data?: unknown) => log("warn", msg, data),
    error: (msg: string, data?: unknown) => log("error", msg, data),
  };
}
EOF

create_file "src/packages/logger/index.ts" << 'EOF'
export { createLogger } from "./logger";
EOF

# ════════════════════════════════════════════════════════════════
# STEP 5 — Fichiers SHARED
# ════════════════════════════════════════════════════════════════

step "Fichiers shared/"

# ── Enums ──

create_file "src/shared/enums/number-status.enum.ts" << 'EOF'
export const NumberStatus = {
  AVAILABLE: "available",
  RESERVED: "reserved",
  SOLD: "sold",
  SUSPENDED: "suspended",
} as const;

export type NumberStatus = (typeof NumberStatus)[keyof typeof NumberStatus];

export const NUMBER_STATUS_CONFIG: Record<
  NumberStatus,
  { label: string; color: string; dotColor: string }
> = {
  available: { label: "Disponible", color: "text-green-600", dotColor: "bg-green-500" },
  reserved: { label: "Réservé", color: "text-yellow-600", dotColor: "bg-yellow-500" },
  sold: { label: "Vendu", color: "text-red-600", dotColor: "bg-red-500" },
  suspended: { label: "Suspendu", color: "text-gray-600", dotColor: "bg-gray-500" },
};
EOF

create_file "src/shared/enums/order-status.enum.ts" << 'EOF'
export const OrderStatus = {
  PENDING: "pending",
  PAID: "paid",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
EOF

create_file "src/shared/enums/index.ts" << 'EOF'
export { NumberStatus, NUMBER_STATUS_CONFIG } from "./number-status.enum";
export type { NumberStatus as NumberStatusType } from "./number-status.enum";

export { OrderStatus } from "./order-status.enum";
export type { OrderStatus as OrderStatusType } from "./order-status.enum";
EOF

# ── Types ──

create_file "src/shared/types/entities/user.types.ts" << 'EOF'
export type User = {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserPreview = Pick<User, "id" | "email" | "name">;
EOF

create_file "src/shared/types/entities/number.types.ts" << 'EOF'
import type { NumberStatus } from "@/shared/enums";

export type NumberCategory = "gold" | "silver" | "bronze" | "standard";

export type PhoneNumber = {
  id: string;
  value: string;
  price: number;
  status: NumberStatus;
  category: NumberCategory;
  ownerId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type NumberPreview = Pick<PhoneNumber, "id" | "value" | "price" | "category">;
export type NumberCreateInput = Pick<PhoneNumber, "value" | "price" | "category">;
export type NumberUpdateInput = Partial<NumberCreateInput>;
EOF

create_file "src/shared/types/entities/order.types.ts" << 'EOF'
import type { OrderStatus } from "@/shared/enums";

export type Order = {
  id: string;
  userId: string;
  numberId: string;
  amount: number;
  status: OrderStatus;
  stripeSessionId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderCreateInput = Pick<Order, "userId" | "numberId" | "amount">;
EOF

create_file "src/shared/types/entities/index.ts" << 'EOF'
export type { User, UserPreview } from "./user.types";
export type {
  PhoneNumber,
  NumberPreview,
  NumberCreateInput,
  NumberUpdateInput,
  NumberCategory,
} from "./number.types";
export type { Order, OrderCreateInput } from "./order.types";
EOF

create_file "src/shared/types/api/responses.types.ts" << 'EOF'
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError };

export type ApiError = {
  code: string;
  message: string;
  details?: Record<string, string[]>;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};
EOF

create_file "src/shared/types/api/requests.types.ts" << 'EOF'
export type PaginationParams = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
EOF

create_file "src/shared/types/api/index.ts" << 'EOF'
export type {
  ApiResponse,
  ApiError,
  PaginatedResponse,
} from "./responses.types";
export type { PaginationParams } from "./requests.types";
EOF

create_file "src/shared/types/ui/index.ts" << 'EOF'
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
EOF

create_file "src/shared/types/index.ts" << 'EOF'
export type {
  User,
  UserPreview,
  PhoneNumber,
  NumberPreview,
  NumberCreateInput,
  NumberUpdateInput,
  NumberCategory,
  Order,
  OrderCreateInput,
} from "./entities";

export type {
  ApiResponse,
  ApiError,
  PaginatedResponse,
  PaginationParams,
} from "./api";
EOF

# ── Schemas ──

create_file "src/shared/schemas/common.schema.ts" << 'EOF'
import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const idSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
export type IdInput = z.infer<typeof idSchema>;
EOF

create_file "src/shared/schemas/number.schema.ts" << 'EOF'
import { z } from "zod";

export const phoneValueSchema = z
  .string()
  .min(7, "Minimum 7 chiffres")
  .max(15, "Maximum 15 chiffres")
  .regex(/^\+?[1-9]\d{6,14}$/, "Format de numéro invalide");

export const priceSchema = z
  .number()
  .min(1, "Prix minimum 1€")
  .max(100_000, "Prix maximum 100 000€");

export const categorySchema = z.enum(["gold", "silver", "bronze", "standard"]);

export const createNumberSchema = z.object({
  value: phoneValueSchema,
  price: priceSchema,
  category: categorySchema,
});

export const updateNumberSchema = createNumberSchema.partial();

export const searchNumberSchema = z.object({
  query: z.string().optional(),
  category: categorySchema.optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateNumberInput = z.infer<typeof createNumberSchema>;
export type UpdateNumberInput = z.infer<typeof updateNumberSchema>;
export type SearchNumberInput = z.infer<typeof searchNumberSchema>;
EOF

create_file "src/shared/schemas/auth.schema.ts" << 'EOF'
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Minimum 8 caractères"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Minimum 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Minimum 8 caractères"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
EOF

create_file "src/shared/schemas/order.schema.ts" << 'EOF'
import { z } from "zod";

export const createOrderSchema = z.object({
  numberId: z.string().min(1),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
EOF

create_file "src/shared/schemas/index.ts" << 'EOF'
export {
  createNumberSchema,
  updateNumberSchema,
  searchNumberSchema,
  phoneValueSchema,
  priceSchema,
  categorySchema,
} from "./number.schema";
export type {
  CreateNumberInput,
  UpdateNumberInput,
  SearchNumberInput,
} from "./number.schema";

export { loginSchema, registerSchema } from "./auth.schema";
export type { LoginInput, RegisterInput } from "./auth.schema";

export { createOrderSchema } from "./order.schema";
export type { CreateOrderInput } from "./order.schema";

export { paginationSchema, idSchema } from "./common.schema";
export type { PaginationInput, IdInput } from "./common.schema";
EOF

# ── Constants ──

create_file "src/shared/constants/routes.ts" << 'EOF'
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
EOF

create_file "src/shared/constants/config.ts" << 'EOF'
export const APP_CONFIG = {
  name: "_n0",
  description: "Your number, zero hassle.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  currency: "EUR",
  locale: "fr-FR",
} as const;

export const PAGINATION = {
  defaultPage: 1,
  defaultPageSize: 20,
  maxPageSize: 100,
} as const;

export const NUMBER_CATEGORIES = {
  gold: { label: "Gold", multiplier: 10, color: "#FFD700" },
  silver: { label: "Silver", multiplier: 5, color: "#C0C0C0" },
  bronze: { label: "Bronze", multiplier: 2, color: "#CD7F32" },
  standard: { label: "Standard", multiplier: 1, color: "#6B7280" },
} as const;
EOF

create_file "src/shared/constants/index.ts" << 'EOF'
export { ROUTES } from "./routes";
export { APP_CONFIG, PAGINATION, NUMBER_CATEGORIES } from "./config";
EOF

# ── Utils ──

create_file "src/shared/utils/string/capitalize.ts" << 'EOF'
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
EOF

create_file "src/shared/utils/string/slugify.ts" << 'EOF'
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
EOF

create_file "src/shared/utils/string/index.ts" << 'EOF'
export { capitalize } from "./capitalize";
export { slugify } from "./slugify";
EOF

create_file "src/shared/utils/number/format-price.ts" << 'EOF'
import { APP_CONFIG } from "@/shared/constants";

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(APP_CONFIG.locale, {
    style: "currency",
    currency: APP_CONFIG.currency,
  }).format(amount);
}
EOF

create_file "src/shared/utils/number/clamp.ts" << 'EOF'
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
EOF

create_file "src/shared/utils/number/index.ts" << 'EOF'
export { formatPrice } from "./format-price";
export { clamp } from "./clamp";
EOF

create_file "src/shared/utils/date/format-date.ts" << 'EOF'
import { APP_CONFIG } from "@/shared/constants";

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat(APP_CONFIG.locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat(APP_CONFIG.locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}
EOF

create_file "src/shared/utils/date/relative-time.ts" << 'EOF'
export function relativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  const intervals: [number, string][] = [
    [31536000, "an"],
    [2592000, "mois"],
    [86400, "jour"],
    [3600, "heure"],
    [60, "minute"],
  ];

  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) {
      return `il y a ${count} ${label}${count > 1 && label !== "mois" ? "s" : ""}`;
    }
  }

  return "à l'instant";
}
EOF

create_file "src/shared/utils/date/index.ts" << 'EOF'
export { formatDate, formatDateTime } from "./format-date";
export { relativeTime } from "./relative-time";
EOF

create_file "src/shared/utils/array/group-by.ts" << 'EOF'
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce(
    (acc, item) => {
      const k = String(item[key]);
      (acc[k] ??= []).push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}
EOF

create_file "src/shared/utils/array/unique.ts" << 'EOF'
export function unique<T>(arr: T[], key?: keyof T): T[] {
  if (!key) return [...new Set(arr)];
  const seen = new Set<unknown>();
  return arr.filter((item) => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}
EOF

create_file "src/shared/utils/array/index.ts" << 'EOF'
export { groupBy } from "./group-by";
export { unique } from "./unique";
EOF

create_file "src/shared/utils/index.ts" << 'EOF'
export * from "./string";
export * from "./number";
export * from "./date";
export * from "./array";
EOF

# ════════════════════════════════════════════════════════════════
# STEP 6 — Fichiers SERVER
# ════════════════════════════════════════════════════════════════

step "Fichiers server/"

# ── Errors ──

create_file "src/server/errors/base.error.ts" << 'EOF'
export class AppError extends Error {
  constructor(
    public readonly code: string,
    public readonly statusCode: number,
    message: string,
    public readonly details?: Record<string, string[]>
  ) {
    super(message);
    this.name = "AppError";
  }
}
EOF

create_file "src/server/errors/not-found.error.ts" << 'EOF'
import { AppError } from "./base.error";

export class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super("NOT_FOUND", 404, `${resource} "${id}" introuvable`);
  }
}
EOF

create_file "src/server/errors/conflict.error.ts" << 'EOF'
import { AppError } from "./base.error";

export class ConflictError extends AppError {
  constructor(message: string) {
    super("CONFLICT", 409, message);
  }
}
EOF

create_file "src/server/errors/unauthorized.error.ts" << 'EOF'
import { AppError } from "./base.error";

export class UnauthorizedError extends AppError {
  constructor(message = "Non autorisé") {
    super("UNAUTHORIZED", 401, message);
  }
}
EOF

create_file "src/server/errors/forbidden.error.ts" << 'EOF'
import { AppError } from "./base.error";

export class ForbiddenError extends AppError {
  constructor(message = "Accès interdit") {
    super("FORBIDDEN", 403, message);
  }
}
EOF

create_file "src/server/errors/validation.error.ts" << 'EOF'
import { AppError } from "./base.error";
import type { ZodError } from "zod";

export class ValidationError extends AppError {
  constructor(zodError: ZodError) {
    const details: Record<string, string[]> = {};

    zodError.errors.forEach((err) => {
      const path = err.path.join(".");
      (details[path] ??= []).push(err.message);
    });

    super("VALIDATION_ERROR", 400, "Données invalides", details);
  }
}
EOF

create_file "src/server/errors/index.ts" << 'EOF'
export { AppError } from "./base.error";
export { NotFoundError } from "./not-found.error";
export { ConflictError } from "./conflict.error";
export { UnauthorizedError } from "./unauthorized.error";
export { ForbiddenError } from "./forbidden.error";
export { ValidationError } from "./validation.error";
EOF

# ── Helpers ──

create_file "src/server/helpers/api-response.helper.ts" << 'EOF'
import { NextResponse } from "next/server";
import type { ApiResponse } from "@/shared/types";
import { AppError } from "@/server/errors";

export function success<T>(data: T, status = 200) {
  return NextResponse.json(
    { success: true, data } satisfies ApiResponse<T>,
    { status }
  );
}

export function created<T>(data: T) {
  return success(data, 201);
}

export function error(err: unknown) {
  if (err instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: err.code,
          message: err.message,
          details: err.details,
        },
      },
      { status: err.statusCode }
    );
  }

  console.error("[_n0] Unexpected error:", err);

  return NextResponse.json(
    {
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "Une erreur inattendue est survenue",
      },
    },
    { status: 500 }
  );
}
EOF

create_file "src/server/helpers/env.helper.ts" << 'EOF'
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  // Ajoute tes variables d'env ici au fur et à mesure
  // STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
  // STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

export const env = validateEnv();
EOF

create_file "src/server/helpers/index.ts" << 'EOF'
export { success, created, error } from "./api-response.helper";
export { env } from "./env.helper";
EOF

# ── Services (exemples) ──

create_file "src/server/services/number.service.ts" << 'EOF'
import { Ok, Err, type Result } from "@/packages/result";
import type { PhoneNumber } from "@/shared/types";
import type { CreateNumberInput, SearchNumberInput } from "@/shared/schemas";

// TODO: Remplacer par de vraies queries DB quand la DB sera setup
const MOCK_NUMBERS: PhoneNumber[] = [
  {
    id: "1",
    value: "+33612345678",
    price: 99,
    status: "available",
    category: "gold",
    ownerId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    value: "+33698765432",
    price: 49,
    status: "available",
    category: "silver",
    ownerId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const NumberService = {
  async search(filters: SearchNumberInput): Promise<Result<PhoneNumber[]>> {
    try {
      let results = [...MOCK_NUMBERS];

      if (filters.query) {
        results = results.filter((n) => n.value.includes(filters.query!));
      }
      if (filters.category) {
        results = results.filter((n) => n.category === filters.category);
      }

      return Ok(results);
    } catch (e) {
      return Err(e as Error);
    }
  },

  async getById(id: string): Promise<Result<PhoneNumber>> {
    const number = MOCK_NUMBERS.find((n) => n.id === id);
    if (!number) return Err(new Error("Not found"));
    return Ok(number);
  },

  async create(input: CreateNumberInput): Promise<Result<PhoneNumber>> {
    const number: PhoneNumber = {
      id: crypto.randomUUID(),
      ...input,
      status: "available",
      ownerId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return Ok(number);
  },
};
EOF

create_file "src/server/services/index.ts" << 'EOF'
export { NumberService } from "./number.service";
EOF

# ── Actions ──

create_file "src/server/actions/number.actions.ts" << 'EOF'
"use server";

import { NumberService } from "@/server/services";
import { createNumberSchema } from "@/shared/schemas";

export async function searchNumbers(query?: string) {
  const result = await NumberService.search({
    query,
    page: 1,
    pageSize: 20,
  });

  if (!result.ok) {
    return { error: result.error.message };
  }

  return { data: result.data };
}

export async function createNumber(formData: FormData) {
  const raw = {
    value: formData.get("value"),
    price: Number(formData.get("price")),
    category: formData.get("category"),
  };

  const parsed = createNumberSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const result = await NumberService.create(parsed.data);

  if (!result.ok) {
    return { error: result.error.message };
  }

  return { data: result.data };
}
EOF

create_file "src/server/actions/index.ts" << 'EOF'
export { searchNumbers, createNumber } from "./number.actions";
EOF

# DB placeholder

create_file "src/server/db/client.ts" << 'EOF'
// TODO: Setup ta DB ici (Prisma, Drizzle, etc.)
//
// Exemple avec Prisma:
// import { PrismaClient } from "@prisma/client";
//
// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
//
// export const db = globalForPrisma.prisma ?? new PrismaClient();
//
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export const db = {} as any; // placeholder
EOF

create_file "src/server/db/index.ts" << 'EOF'
export { db } from "./client";
EOF

# ════════════════════════════════════════════════════════════════
# STEP 7 — Fichiers CLIENT
# ════════════════════════════════════════════════════════════════

step "Fichiers client/"

# ── Lib ──

create_file "src/client/lib/cn.ts" << 'EOF'
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF

create_file "src/client/lib/api.ts" << 'EOF'
import { createClient } from "@/packages/api-client";
import type { PhoneNumber, ApiResponse } from "@/shared/types";
import type { SearchNumberInput } from "@/shared/schemas";

const client = createClient({
  baseUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
});

export const api = {
  numbers: {
    search: (params?: Partial<SearchNumberInput>) =>
      client.get<ApiResponse<PhoneNumber[]>>("/api/numbers", params as Record<string, string>),

    getById: (id: string) =>
      client.get<ApiResponse<PhoneNumber>>(`/api/numbers/${id}`),
  },
};
EOF

create_file "src/client/lib/index.ts" << 'EOF'
export { cn } from "./cn";
export { api } from "./api";
EOF

# ── UI Components ──

create_file "src/client/components/ui/button/button.variants.ts" << 'EOF'
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 text-white hover:bg-neutral-800",
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-neutral-300 bg-transparent hover:bg-neutral-100",
        ghost: "hover:bg-neutral-100",
        link: "text-blue-600 underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);
EOF

create_file "src/client/components/ui/button/button.tsx" << 'EOF'
"use client";

import { forwardRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/client/lib/cn";
import { buttonVariants } from "./button.variants";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
);

Button.displayName = "Button";
EOF

create_file "src/client/components/ui/button/index.ts" << 'EOF'
export { Button, type ButtonProps } from "./button";
export { buttonVariants } from "./button.variants";
EOF

create_file "src/client/components/ui/card/card.tsx" << 'EOF'
import { cn } from "@/client/lib/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-lg border border-neutral-200 bg-white shadow-sm", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: CardProps) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}
EOF

create_file "src/client/components/ui/card/index.ts" << 'EOF'
export { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";
EOF

create_file "src/client/components/ui/input/input.tsx" << 'EOF'
"use client";

import { forwardRef } from "react";
import { cn } from "@/client/lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <div className="w-full">
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-colors",
          "placeholder:text-neutral-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-red-500" : "border-neutral-300",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
);

Input.displayName = "Input";
EOF

create_file "src/client/components/ui/input/index.ts" << 'EOF'
export { Input, type InputProps } from "./input";
EOF

create_file "src/client/components/ui/badge/badge.tsx" << 'EOF'
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/client/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-neutral-100 text-neutral-800",
        green: "bg-green-100 text-green-800",
        yellow: "bg-yellow-100 text-yellow-800",
        red: "bg-red-100 text-red-800",
        blue: "bg-blue-100 text-blue-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
EOF

create_file "src/client/components/ui/badge/index.ts" << 'EOF'
export { Badge } from "./badge";
EOF

create_file "src/client/components/ui/skeleton/skeleton.tsx" << 'EOF'
import { cn } from "@/client/lib/cn";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-200", className)}
      {...props}
    />
  );
}
EOF

create_file "src/client/components/ui/skeleton/index.ts" << 'EOF'
export { Skeleton } from "./skeleton";
EOF

create_file "src/client/components/ui/index.ts" << 'EOF'
export { Button, type ButtonProps, buttonVariants } from "./button";
export { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";
export { Input, type InputProps } from "./input";
export { Badge } from "./badge";
export { Skeleton } from "./skeleton";
EOF

# ── Common Components ──

create_file "src/client/components/common/empty-state/empty-state.tsx" << 'EOF'
type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon && <div className="mb-4 text-neutral-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-neutral-500">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
EOF

create_file "src/client/components/common/empty-state/index.ts" << 'EOF'
export { EmptyState } from "./empty-state";
EOF

create_file "src/client/components/common/status-badge/status-badge.tsx" << 'EOF'
import { Badge } from "@/client/components/ui";
import { NUMBER_STATUS_CONFIG } from "@/shared/enums";
import type { NumberStatus } from "@/shared/enums";

type StatusBadgeProps = {
  status: NumberStatus;
};

const VARIANT_MAP: Record<string, "green" | "yellow" | "red" | "default"> = {
  available: "green",
  reserved: "yellow",
  sold: "red",
  suspended: "default",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = NUMBER_STATUS_CONFIG[status];
  return <Badge variant={VARIANT_MAP[status]}>{config.label}</Badge>;
}
EOF

create_file "src/client/components/common/status-badge/index.ts" << 'EOF'
export { StatusBadge } from "./status-badge";
EOF

create_file "src/client/components/common/index.ts" << 'EOF'
export { EmptyState } from "./empty-state";
export { StatusBadge } from "./status-badge";
EOF

# ── Feature Components ──

create_file "src/client/components/features/numbers/number-card.tsx" << 'EOF'
import type { PhoneNumber } from "@/shared/types";
import { formatPrice } from "@/shared/utils";
import { Card, CardContent, CardFooter, Button } from "@/client/components/ui";
import { StatusBadge } from "@/client/components/common";

type NumberCardProps = {
  number: PhoneNumber;
  onPurchase?: (id: string) => void;
};

export function NumberCard({ number, onPurchase }: NumberCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <p className="text-xl font-mono font-bold">{number.value}</p>
          <StatusBadge status={number.status} />
        </div>
        <p className="mt-2 text-2xl font-bold text-blue-600">
          {formatPrice(number.price)}
        </p>
        <p className="mt-1 text-xs text-neutral-500 capitalize">
          {number.category}
        </p>
      </CardContent>
      {number.status === "available" && onPurchase && (
        <CardFooter>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => onPurchase(number.id)}
          >
            Acheter
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
EOF

create_file "src/client/components/features/numbers/number-grid.tsx" << 'EOF'
"use client";

import type { PhoneNumber } from "@/shared/types";
import { NumberCard } from "./number-card";
import { EmptyState } from "@/client/components/common";

type NumberGridProps = {
  numbers: PhoneNumber[];
  onPurchase?: (id: string) => void;
};

export function NumberGrid({ numbers, onPurchase }: NumberGridProps) {
  if (numbers.length === 0) {
    return (
      <EmptyState
        title="Aucun numéro trouvé"
        description="Essayez de modifier vos filtres de recherche."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {numbers.map((number) => (
        <NumberCard key={number.id} number={number} onPurchase={onPurchase} />
      ))}
    </div>
  );
}
EOF

create_file "src/client/components/features/numbers/index.ts" << 'EOF'
export { NumberCard } from "./number-card";
export { NumberGrid } from "./number-grid";
EOF

create_file "src/client/components/features/landing/hero.tsx" << 'EOF'
import { APP_CONFIG } from "@/shared/constants";
import { Button } from "@/client/components/ui";

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-bold tracking-tight">
        {APP_CONFIG.name}
      </h1>
      <p className="mt-4 max-w-lg text-lg text-neutral-600">
        {APP_CONFIG.description}
      </p>
      <div className="mt-8 flex gap-4">
        <Button variant="primary" size="lg">
          Voir les numéros
        </Button>
        <Button variant="outline" size="lg">
          Comment ça marche
        </Button>
      </div>
    </section>
  );
}
EOF

create_file "src/client/components/features/landing/index.ts" << 'EOF'
export { Hero } from "./hero";
EOF

create_file "src/client/components/features/index.ts" << 'EOF'
export { NumberCard, NumberGrid } from "./numbers";
export { Hero } from "./landing";
EOF

# ── Layout Components ──

create_file "src/client/components/layout/header/header.tsx" << 'EOF'
import Link from "next/link";
import { APP_CONFIG } from "@/shared/constants";
import { ROUTES } from "@/shared/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href={ROUTES.home} className="text-xl font-bold font-mono">
          {APP_CONFIG.name}
        </Link>
        <nav className="flex items-center gap-6">
          <Link href={ROUTES.pricing} className="text-sm text-neutral-600 hover:text-neutral-900">
            Pricing
          </Link>
          <Link href={ROUTES.auth.login} className="text-sm text-neutral-600 hover:text-neutral-900">
            Connexion
          </Link>
        </nav>
      </div>
    </header>
  );
}
EOF

create_file "src/client/components/layout/header/index.ts" << 'EOF'
export { Header } from "./header";
EOF

create_file "src/client/components/layout/footer/footer.tsx" << 'EOF'
import { APP_CONFIG } from "@/shared/constants";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} {APP_CONFIG.name}. Tous droits réservés.
      </div>
    </footer>
  );
}
EOF

create_file "src/client/components/layout/footer/index.ts" << 'EOF'
export { Footer } from "./footer";
EOF

create_file "src/client/components/layout/index.ts" << 'EOF'
export { Header } from "./header";
export { Footer } from "./footer";
EOF

# ── Hooks ──

create_file "src/client/hooks/common/use-debounce.ts" << 'EOF'
"use client";

import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
EOF

create_file "src/client/hooks/common/use-copy-to-clipboard.ts" << 'EOF'
"use client";

import { useState, useCallback } from "react";

export function useCopyToClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    },
    [timeout]
  );

  return { copied, copy };
}
EOF

create_file "src/client/hooks/common/index.ts" << 'EOF'
export { useDebounce } from "./use-debounce";
export { useCopyToClipboard } from "./use-copy-to-clipboard";
EOF

create_file "src/client/hooks/features/use-numbers.ts" << 'EOF'
"use client";

import { useState, useEffect } from "react";
import type { PhoneNumber, ApiResponse } from "@/shared/types";

export function useNumbers() {
  const [numbers, setNumbers] = useState<PhoneNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    fetch("/api/numbers")
      .then((res) => res.json() as Promise<ApiResponse<PhoneNumber[]>>)
      .then((res) => {
        if (!res.success) throw new Error(res.error.message);
        setNumbers(res.data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { numbers, loading, error };
}
EOF

create_file "src/client/hooks/features/index.ts" << 'EOF'
export { useNumbers } from "./use-numbers";
EOF

create_file "src/client/hooks/index.ts" << 'EOF'
export * from "./common";
export * from "./features";
EOF

# ── Providers ──

create_file "src/client/providers/theme-provider.tsx" << 'EOF'
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
EOF

create_file "src/client/providers/index.ts" << 'EOF'
export { ThemeProvider, useTheme } from "./theme-provider";
EOF

# ── Stores ──

create_file "src/client/stores/cart.store.ts" << 'EOF'
import { create } from "zustand";
import type { NumberPreview } from "@/shared/types";

type CartState = {
  items: NumberPreview[];
  add: (item: NumberPreview) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  add: (item) =>
    set((state) => {
      if (state.items.some((i) => i.id === item.id)) return state;
      return { items: [...state.items, item] };
    }),

  remove: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  clear: () => set({ items: [] }),

  total: () => get().items.reduce((sum, i) => sum + i.price, 0),
}));
EOF

create_file "src/client/stores/index.ts" << 'EOF'
export { useCartStore } from "./cart.store";
EOF

# ════════════════════════════════════════════════════════════════
# STEP 8 — Restructurer app/
# ════════════════════════════════════════════════════════════════

step "Restructuration app/"

# Sauvegarder le CSS original
if [ -f "app/globals.css" ]; then
  cp app/globals.css app/globals.css.bak
  success "Sauvegarde globals.css"
fi

# ── Root layout ──

create_file "app/layout.tsx" << 'EOF'
import type { Metadata } from "next";
import { APP_CONFIG } from "@/shared/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: APP_CONFIG.name,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
EOF

# ── Marketing layout + pages ──

create_file "app/(marketing)/layout.tsx" << 'EOF'
import { Header } from "@/client/components/layout";
import { Footer } from "@/client/components/layout";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4">{children}</main>
      <Footer />
    </>
  );
}
EOF

create_file "app/(marketing)/page.tsx" << 'EOF'
import { Hero } from "@/client/components/features/landing";

export default function HomePage() {
  return <Hero />;
}
EOF

# ── Auth pages ──

create_file "app/(auth)/layout.tsx" << 'EOF'
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
EOF

create_file "app/(auth)/login/page.tsx" << 'EOF'
import { Card, CardHeader, CardTitle, CardContent } from "@/client/components/ui";

export const metadata = { title: "Connexion" };

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: <LoginForm /> */}
        <p className="text-sm text-neutral-500">Login form coming soon...</p>
      </CardContent>
    </Card>
  );
}
EOF

create_file "app/(auth)/register/page.tsx" << 'EOF'
import { Card, CardHeader, CardTitle, CardContent } from "@/client/components/ui";

export const metadata = { title: "Inscription" };

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inscription</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: <RegisterForm /> */}
        <p className="text-sm text-neutral-500">Register form coming soon...</p>
      </CardContent>
    </Card>
  );
}
EOF

# ── Dashboard pages ──

create_file "app/(dashboard)/layout.tsx" << 'EOF'
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* TODO: <Sidebar /> */}
      <aside className="w-64 border-r border-neutral-200 bg-neutral-50 p-4">
        <p className="font-mono font-bold text-lg mb-8">_n0</p>
        <nav className="space-y-2 text-sm">
          <a href="/numbers" className="block rounded px-3 py-2 hover:bg-neutral-200">Numéros</a>
          <a href="/orders" className="block rounded px-3 py-2 hover:bg-neutral-200">Commandes</a>
          <a href="/settings" className="block rounded px-3 py-2 hover:bg-neutral-200">Paramètres</a>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
EOF

create_file "app/(dashboard)/numbers/page.tsx" << 'EOF'
import { NumberGrid } from "@/client/components/features/numbers";
import { NumberService } from "@/server/services";

export const metadata = { title: "Numéros" };

export default async function NumbersPage() {
  const result = await NumberService.search({ page: 1, pageSize: 20 });

  const numbers = result.ok ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Numéros disponibles</h1>
      </div>
      <NumberGrid numbers={numbers} />
    </div>
  );
}
EOF

create_file "app/(dashboard)/orders/page.tsx" << 'EOF'
import { EmptyState } from "@/client/components/common";

export const metadata = { title: "Commandes" };

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mes commandes</h1>
      <EmptyState
        title="Aucune commande"
        description="Vos commandes apparaîtront ici."
      />
    </div>
  );
}
EOF

create_file "app/(dashboard)/settings/page.tsx" << 'EOF'
export const metadata = { title: "Paramètres" };

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Paramètres</h1>
      <p className="text-neutral-500">Coming soon...</p>
    </div>
  );
}
EOF

# ── API Routes ──

create_file "app/api/numbers/route.ts" << 'EOF'
import type { NextRequest } from "next/server";
import { NumberService } from "@/server/services";
import { searchNumberSchema } from "@/shared/schemas";
import { ValidationError } from "@/server/errors";
import { success, error } from "@/server/helpers";

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const parsed = searchNumberSchema.safeParse(params);

    if (!parsed.success) {
      return error(new ValidationError(parsed.error));
    }

    const result = await NumberService.search(parsed.data);

    if (!result.ok) return error(result.error);

    return success(result.data);
  } catch (e) {
    return error(e);
  }
}
EOF

create_file "app/api/numbers/[id]/route.ts" << 'EOF'
import { NumberService } from "@/server/services";
import { success, error } from "@/server/helpers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await NumberService.getById(id);

    if (!result.ok) return error(result.error);

    return success(result.data);
  } catch (e) {
    return error(e);
  }
}
EOF

# ── Not found ──

create_file "app/not-found.tsx" << 'EOF'
import Link from "next/link";
import { Button } from "@/client/components/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold font-mono">404</h1>
      <p className="mt-4 text-lg text-neutral-600">Page introuvable</p>
      <Link href="/" className="mt-8">
        <Button variant="primary">Retour à l&apos;accueil</Button>
      </Link>
    </div>
  );
}
EOF

# ════════════════════════════════════════════════════════════════
# STEP 9 — Mise à jour des configs
# ════════════════════════════════════════════════════════════════

step "Mise à jour des configurations"

# ── tsconfig.json ──

node -e "
const fs = require('fs');
const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));

tsconfig.compilerOptions.paths = {
  '@/client/*': ['./src/client/*'],
  '@/server/*': ['./src/server/*'],
  '@/shared/*': ['./src/shared/*'],
  '@/packages/*': ['./src/packages/*'],
  '@/*': ['./*']
};

fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, 2) + '\n');
"
success "tsconfig.json — paths mis à jour"

# ── .env.example ──

create_file ".env.example" << 'EOF'
# ── App ──
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# ── Database ──
DATABASE_URL=

# ── Auth ──
# NEXTAUTH_SECRET=
# NEXTAUTH_URL=http://localhost:3000

# ── Stripe ──
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# ── Twilio ──
# TWILIO_ACCOUNT_SID=
# TWILIO_AUTH_TOKEN=
EOF

# ── .env (copie de .env.example si pas existant) ──

if [ ! -f ".env" ]; then
  cp .env.example .env
  success ".env créé depuis .env.example"
fi

# ── Nettoyage ──

# Supprimer les fichiers par défaut de Next.js
rm -f app/page.tsx.bak 2>/dev/null
rm -f app/globals.css.bak 2>/dev/null
rm -f public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg 2>/dev/null

success "Fichiers par défaut nettoyés"

# ════════════════════════════════════════════════════════════════
# RÉSUMÉ
# ════════════════════════════════════════════════════════════════

echo ""
echo ""
echo -e "${GREEN}${BOLD}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}${BOLD}  ✓ _n0 Architecture Setup Complete!${NC}"
echo -e "${GREEN}${BOLD}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Compter les fichiers créés
file_count=$(find src -type f | wc -l)
dir_count=$(find src -type d | wc -l)

echo -e "  ${CYAN}📁 Dossiers créés :${NC}  $dir_count"
echo -e "  ${CYAN}📄 Fichiers créés :${NC}  $file_count"
echo ""
echo -e "  ${BOLD}Structure :${NC}"
echo ""
echo -e "  ${BLUE}src/packages/${NC}   → Modules autonomes (result, phone, api-client, logger)"
echo -e "  ${BLUE}src/shared/${NC}     → Types, schemas, utils, constants, enums"
echo -e "  ${BLUE}src/server/${NC}     → DB, services, adapters, actions, errors, helpers"
echo -e "  ${BLUE}src/client/${NC}     → Components (ui/common/features/layout), hooks, stores"
echo -e "  ${BLUE}app/${NC}            → Routing only (pages + API routes)"
echo ""
echo -e "  ${BOLD}Commandes :${NC}"
echo ""
echo -e "  ${YELLOW}$PM dev${NC}          → Démarrer le serveur de dev"
echo -e "  ${YELLOW}$PM build${NC}        → Build production"
echo ""
echo -e "  ${BOLD}Imports :${NC}"
echo ""
echo -e "  ${DIM}import { Button } from ${NC}${GREEN}\"@/client/components/ui\"${NC}"
echo -e "  ${DIM}import { NumberService } from ${NC}${GREEN}\"@/server/services\"${NC}"
echo -e "  ${DIM}import type { PhoneNumber } from ${NC}${GREEN}\"@/shared/types\"${NC}"
echo -e "  ${DIM}import { parsePhone } from ${NC}${GREEN}\"@/packages/phone\"${NC}"
echo ""
echo -e "  ${GREEN}${BOLD}Ready to build _n0! 🚀${NC}"
echo ""
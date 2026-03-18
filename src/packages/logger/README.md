# Logger Package - How to Use

A comprehensive, production-ready logging solution for Next.js applications that works seamlessly across server and client environments.

## Features

- 🌈 Rich CLI output for development with ANSI colors
- 📊 Structured JSON output for production
- 🔄 Complex object serialization with circular reference detection
- 🏷️ Context support for request tracing
- ⏱️ Performance timing utilities
- 📋 Tabular data display
- 🌳 Tree visualization for complex objects
- 📱 Browser console styling
- 🔧 TypeScript-first design

## Installation

The logger is already included in your project at `src/packages/logger/`. Import it directly:

```typescript
import { createLogger, Logger } from '@/packages/logger';
// or
import logger from '@/packages/logger';
```

## Basic Usage

### Creating a Logger

```typescript
// Simple logger with default settings
const logger = createLogger();

// Logger with custom configuration
const logger = createLogger({
  prefix: 'api',
  minLevel: 'debug',
  timestamp: true,
  colorize: true,
});
```

### Log Levels

```typescript
logger.trace('Very detailed debugging info');
logger.debug('Debugging information');
logger.info('General information');
logger.warn('Warning conditions');
logger.error('Error conditions');
logger.fatal('Critical system errors');
```

### Logging with Data

```typescript
// Simple message
logger.info('Server started on port 3000');

// With structured data
logger.info('User login', {
  userId: 123,
  email: 'user@example.com',
  timestamp: new Date(),
});

// With errors
logger.error('Database connection failed', new Error('Connection timeout'));

// Multiple data items
logger.debug('API call', { method: 'GET', url: '/api/users' }, { duration: 150 });
```

## Advanced Features

### Context Support

Add persistent context to all log entries:

```typescript
// Set persistent context
logger.setContext('requestId', 'abc-123');
logger.setContext('userId', 456);

// All subsequent logs will include this context
logger.info('Processing request'); // Includes requestId and userId

// Clear context
logger.clearContext();
```

### Child Loggers

Create child loggers with inherited configuration:

```typescript
const requestLogger = logger.child({ requestId: 'req-123' });
requestLogger.info('Handling request'); // Inherits config, adds context

// Child with custom config
const apiLogger = logger.child({
  prefix: 'api',
  minLevel: 'info'
});
```

### One-time Context

Add context to a single log entry:

```typescript
logger.with({ requestId: 'req-123', userId: 456 })
  .info('Processing payment');
// Context is only applied to this log entry
```

### Performance Timing

```typescript
// Start a timer
logger.timer('database-query');

// Perform operation
await fetchDataFromDB();

// Log completion with duration
logger.timerEnd('database-query'); // "database-query completed in 42.3ms"
```

### Grouping

Organize related logs:

```typescript
logger.group('User Registration');
logger.info('Validating input');
logger.info('Creating user account');
logger.info('Sending welcome email');
logger.groupEnd();
```

### Tabular Data

Display arrays/objects as tables:

```typescript
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

logger.table(users);
// Or specify columns
logger.table(users, { columns: ['name', 'email'] });
```

### Tree Visualization

Display complex objects as trees:

```typescript
const data = {
  users: [
    { id: 1, profile: { name: 'Alice', settings: { theme: 'dark' } } }
  ],
  metadata: { version: '1.0', features: ['auth', 'api'] }
};

logger.tree(data);
```

## Environment-Specific Behavior

### Next.js Server Components

```typescript
// app/page.tsx or app/layout.tsx
import { createLogger } from '@/packages/logger';

export default function Page() {
  const logger = createLogger({ prefix: 'page' });

  logger.info('Page rendered');

  return <div>Hello World</div>;
}
```

### API Routes

```typescript
// app/api/users/route.ts
import { createLogger } from '@/packages/logger';

export async function GET() {
  const logger = createLogger({ prefix: 'api-users' });

  try {
    logger.info('Fetching users');
    const users = await getUsers();
    logger.info('Users fetched successfully', { count: users.length });

    return Response.json(users);
  } catch (error) {
    logger.error('Failed to fetch users', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Client Components

```typescript
// components/UserProfile.tsx
'use client';

import { createLogger } from '@/packages/logger';

export function UserProfile({ user }: { user: User }) {
  const logger = createLogger({ prefix: 'UserProfile' });

  React.useEffect(() => {
    logger.info('UserProfile component mounted', { userId: user.id });
  }, [user.id]);

  return <div>Welcome {user.name}!</div>;
}
```

### Middleware

```typescript
// middleware.ts
import { createLogger } from '@/packages/logger';

export function middleware(request: NextRequest) {
  const logger = createLogger({ prefix: 'middleware' });

  logger.info('Request received', {
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
  });

  // Create child logger for this request
  const requestLogger = logger.child({
    requestId: crypto.randomUUID(),
    path: request.nextUrl.pathname,
  });

  // Add to request headers for use in API routes
  const response = NextResponse.next();
  response.headers.set('x-request-id', requestLogger.getContext().requestId);

  return response;
}
```

### Server Actions

```typescript
// app/actions.ts
'use server';

import { createLogger } from '@/packages/logger';

export async function createUser(formData: FormData) {
  const logger = createLogger({ prefix: 'createUser' });

  try {
    logger.info('Creating user', {
      email: formData.get('email'),
      timestamp: new Date(),
    });

    const user = await db.user.create({
      data: {
        email: formData.get('email'),
        name: formData.get('name'),
      },
    });

    logger.info('User created successfully', { userId: user.id });
    return { success: true, user };
  } catch (error) {
    logger.error('Failed to create user', error);
    return { success: false, error: 'Failed to create user' };
  }
}
```

## Configuration Options

```typescript
interface LoggerConfig {
  /** Minimum log level to output */
  minLevel?: LogLevel; // 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'

  /** Prefix for all log messages */
  prefix?: string;

  /** Whether to colorize output (server only) */
  colorize?: boolean;

  /** Whether to show timestamps */
  timestamp?: boolean;

  /** Production mode - outputs JSON instead of formatted text */
  production?: boolean;

  /** Environment override */
  environment?: Environment; // 'server' | 'client' | 'edge'

  /** Include stack traces for errors */
  stackTrace?: boolean;

  /** Maximum depth for object serialization */
  maxDepth?: number;

  /** Maximum array length to display */
  maxArrayLength?: number;

  /** Maximum string length before truncation */
  maxStringLength?: number;
}
```

## Production Configuration

In production, the logger automatically switches to JSON mode:

```typescript
// In production, this outputs:
// {"timestamp":"2024-01-01T12:00:00.000Z","level":"info","message":"Request processed","prefix":"api","data":[{"userId":123}]}

logger.info('Request processed', { userId: 123 });
```

Set environment variable `NODE_ENV=production` to enable production mode.

## Error Handling Integration

The logger has special handling for `AppError` instances:

```typescript
import { AppError } from '@/server/errors';

try {
  throw new AppError('VALIDATION_ERROR', 400, 'Invalid input', {
    field: ['email', 'required'],
    field: ['password', 'min_length'],
  });
} catch (error) {
  logger.error('Validation failed', error);
  // Shows structured error with code, statusCode, and field details
}
```

## Integration with Existing Code

Replace console.log statements:

```typescript
// Before
console.log('User logged in', user.id);

// After
logger.info('User logged in', { userId: user.id });
```

Replace winston or other loggers:

```typescript
// Before (winston)
const winston = require('winston');
const logger = winston.createLogger({ ... });

// After
import { createLogger } from '@/packages/logger';
const logger = createLogger({ prefix: 'app' });
```

## Best Practices

1. **Use meaningful prefixes**: `api-users`, `middleware`, `database`
2. **Include context**: Add `requestId`, `userId`, etc. for tracing
3. **Use appropriate log levels**: Reserve `error` for actual errors
4. **Structure data**: Pass objects instead of string concatenation
5. **Use timers for performance monitoring**
6. **Create child loggers for scoped operations**

## Output Examples

### Development (Server)

```
[INFO] 12:34:56.789 [_n0] Server started on port 3000
[DEBUG] 12:34:56.790 [_n0] Database connected
[INFO] 12:34:56.791 [_n0] User login { userId: 123, email: "user@example.com" }
[ERROR] 12:34:56.792 [_n0] Login failed
  └─ ValidationError: Invalid credentials
      ├─ code: "INVALID_CREDENTIALS"
      ├─ status: 401
      └─ stack:
          ├─ at validateCredentials (/app/auth.ts:42:9)
          ├─ at login (/app/auth.ts:67:15)
          └─ at handler (/app/api/login.ts:23:7)
```

### Development (Browser Console)

Styled output with colors, collapsible groups, and structured data.

### Production (JSON)

```json
{
  "timestamp": "2024-01-01T12:00:00.000Z",
  "level": "info",
  "message": "Request processed",
  "prefix": "api",
  "data": [{ "userId": 123, "duration": 150 }],
  "context": { "requestId": "abc-123" },
  "environment": "server"
}
```

## Troubleshooting

### No colors in terminal?
- Ensure your terminal supports ANSI colors
- Check if output is being piped: `NODE_ENV=development node app.js | cat`

### Large objects not showing?
- Adjust `maxDepth` and `maxArrayLength` in config
- Use `logger.tree(obj)` for full inspection

### Context not appearing?
- Use `setContext()` for persistent context
- Use `with()` for one-time context
- Use `child()` for scoped context

### Edge Runtime issues?
- The logger automatically detects Edge Runtime and disables colors
- Some features may be limited in Edge Runtime

## TypeScript Support

Full TypeScript support with comprehensive types:

```typescript
import type { Logger, LogLevel, LoggerConfig } from '@/packages/logger';

// Strongly typed
const logger: Logger = createLogger();
const level: LogLevel = 'info';
const config: LoggerConfig = { prefix: 'api', minLevel: 'debug' };
```

This logger provides everything you need for robust, production-ready logging in Next.js applications!
import { Injectable } from '@angular/core';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

/**
 * Authentication Interceptor Example
 * Demonstrates:
 * - HTTP Interceptors
 * - Adding headers to requests
 * - Handling responses and errors
 */

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get token from localStorage
  const token = localStorage.getItem('auth_token');

  // Clone request and add authorization header
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};

/**
 * Error Handling Interceptor Example
 * Demonstrates:
 * - Error handling in interceptors
 * - Retry logic
 * - Response transformation
 */

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      console.error('HTTP Error:', error);

      // Handle 401 Unauthorized
      if (error.status === 401) {
        console.warn('Unauthorized - redirecting to login');
        // Redirect to login page
        // this.router.navigate(['/login']);
      }

      // Handle 403 Forbidden
      if (error.status === 403) {
        console.warn('Access Forbidden');
      }

      // Handle 500 Server Error
      if (error.status >= 500) {
        console.error('Server error occurred');
      }

      return throwError(() => ({
        message: error.message,
        status: error.status,
        timestamp: new Date()
      }));
    })
  );
};

/**
 * Logging Interceptor Example
 * Demonstrates:
 * - Request/response logging
 * - Performance monitoring
 */

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = performance.now();

  console.log(`HTTP Request: ${req.method} ${req.url}`);

  return next(req).pipe(
    tap({
      next: (event: any) => {
        if (event.status) {
          const duration = performance.now() - startTime;
          console.log(`HTTP Response: ${req.method} ${req.url} - ${event.status} (${duration.toFixed(2)}ms)`);
        }
      },
      error: (error: any) => {
        const duration = performance.now() - startTime;
        console.error(`HTTP Error: ${req.method} ${req.url} - ${error.status} (${duration.toFixed(2)}ms)`);
      }
    })
  );
};

/**
 * Caching Interceptor Example
 * Demonstrates:
 * - Response caching
 * - Cache strategy
 */

@Injectable({ providedIn: 'root' })
export class CacheService {
  private cache = new Map<string, any>();

  get(key: string): any {
    return this.cache.get(key);
  }

  put(key: string, value: any): void {
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(CacheService);

  // Only cache GET requests
  if (req.method !== 'GET') {
    return next(req);
  }

  const cachedResponse = cacheService.get(req.url);
  if (cachedResponse) {
    console.log('Returning cached response for:', req.url);
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap((event: any) => {
      if (event instanceof HttpResponse) {
        cacheService.put(req.url, event);
      }
    })
  );
};

/**
 * Usage in app.config.ts (Standalone):
 * 
 * import { provideHttpClient, withInterceptors } from '@angular/common/http';
 * 
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(
 *       withInterceptors([
 *         loggingInterceptor,
 *         authInterceptor,
 *         errorInterceptor,
 *         cachingInterceptor
 *       ])
 *     )
 *   ]
 * };
 */

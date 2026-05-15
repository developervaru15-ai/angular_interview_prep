import { Pipe, PipeTransform } from '@angular/core';

/**
 * Reverse Pipe Example
 * Demonstrates:
 * - Custom pipe creation
 * - PipeTransform interface
 * - Pure vs Impure pipes
 */

@Pipe({
  name: 'appReverse',
  standalone: true,
  pure: true // Pure pipes are called only when input value changes
})
export class ReversePipe implements PipeTransform {
  transform(value: string | string[]): string | string[] {
    if (!value) {
      return value;
    }

    if (typeof value === 'string') {
      return value.split('').reverse().join('');
    }

    if (Array.isArray(value)) {
      return value.slice().reverse();
    }

    return value;
  }
}

/**
 * Safe HTML Pipe Example
 * Demonstrates:
 * - Security with DomSanitizer
 * - SafeHtml type
 */

import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'appSafeHtml',
  standalone: true
})
@Injectable()
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

/**
 * Truncate Pipe Example
 * Demonstrates:
 * - Pipe parameters
 * - Text manipulation
 */

@Pipe({
  name: 'appTruncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, ellipsis: string = '...'): string {
    if (!value) {
      return value;
    }

    if (value.length <= limit) {
      return value;
    }

    return value.substring(0, limit) + ellipsis;
  }
}

/**
 * Usage Examples:
 * 
 * {{ 'Hello Angular' | appReverse }}
 * Output: ralugnA olleH
 * 
 * {{ [1, 2, 3, 4, 5] | appReverse }}
 * Output: [5, 4, 3, 2, 1]
 * 
 * {{ userContent | appSafeHtml }}
 * Safely renders HTML
 * 
 * {{ longText | appTruncate:30 }}
 * Output: This is a long text that will...
 * 
 * {{ longText | appTruncate:30:'***' }}
 * Output: This is a long text that will***
 */

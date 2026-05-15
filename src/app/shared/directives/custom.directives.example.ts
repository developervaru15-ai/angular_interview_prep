import { Directive, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Highlight Directive Example
 * Demonstrates:
 * - Attribute directives
 * - HostListener decorator
 * - ElementRef for DOM manipulation
 */

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: string = 'yellow'; // Default color
  @Input() highlightOnHover: boolean = true;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (!this.highlightOnHover) {
      this.highlight(this.appHighlight);
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.highlight(this.appHighlight);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.highlight('transparent');
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.transition = 'background-color 0.2s ease';
  }
}

/**
 * Trim Directive Example
 * Demonstrates:
 * - Two-way property binding with directives
 */

@Directive({
  selector: 'input[appTrim]',
  standalone: true
})
export class TrimDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('blur')
  onBlur(): void {
    if (this.ngControl.value) {
      this.ngControl.control?.setValue(this.ngControl.value.trim());
    }
  }
}

/**
 * Log Click Directive Example
 * Demonstrates:
 * - HostListener with parameters
 * - Event handling in directives
 */

@Directive({
  selector: '[appLogClick]',
  standalone: true
})
export class LogClickDirective {
  @Input() appLogClick: string = 'Element';

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    console.log(`${this.appLogClick} clicked at ${event.clientX}, ${event.clientY}`);
  }
}

/**
 * If Directive Example (Structural Directive)
 * Demonstrates:
 * - Structural directives
 * - TemplateRef and ViewContainerRef
 */

@Directive({
  selector: '[appIf]',
  standalone: true
})
export class IfDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set appIf(condition: boolean) {
    if (condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}

/**
 * Usage Examples:
 * 
 * <p appHighlight="green">Hover me - will highlight on hover</p>
 * 
 * <p [appHighlight]="'blue'" [highlightOnHover]="false">Always highlighted</p>
 * 
 * <input type="text" appTrim placeholder="Text will be trimmed on blur">
 * 
 * <button appLogClick="Submit Button">Click me</button>
 * 
 * <div *appIf="isVisible">This shows when isVisible is true</div>
 */

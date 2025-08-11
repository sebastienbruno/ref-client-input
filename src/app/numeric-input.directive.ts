import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appAppNumericInput]',
  standalone: true
})
export class NumericInputDirective {

  private readonly elementRef = inject(ElementRef<HTMLInputElement>);

  @HostListener('input') onInput() {
    const value = (this.elementRef.nativeElement as HTMLInputElement).value;
    (this.elementRef.nativeElement as HTMLInputElement).value = value.replace(/[^0-9]+/g, '');
  }

}

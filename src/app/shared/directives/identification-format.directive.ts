import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appIdentificationFormat]'
})

export class IdentificationFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: any) {
    const inputValue = event.target.value.replace(/\D/g, ''); // Sadece sayıları al
    if (inputValue.length <= 6) {
      // İlk 6 karakteri al
      const formattedValue = inputValue.slice(0, 6);
      this.el.nativeElement.value = formattedValue;
    } else {
      // İlk 6 karakteri al, '-' ekle ve sonrasını al
      const formattedValue = inputValue.slice(0, 6) + '-' + inputValue.slice(6, 10);
      this.el.nativeElement.value = formattedValue;
    } 
  }

  @HostListener('blur', ['$event']) onBlur(event: FocusEvent) {
    // Input odaktan çıkınca, eksik karakterleri tamamla
    const currentValue = this.el.nativeElement.value.replace(/\D/g, '');
    if (currentValue.length >= 6 && currentValue.length <= 10) {
      const formattedValue = currentValue.slice(0, 6) + '-' + currentValue.slice(6, 10);
      this.el.nativeElement.value = formattedValue;
    }
  }
}

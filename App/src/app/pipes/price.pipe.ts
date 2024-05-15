import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  // Append ₹
  transform(value: unknown, ...args: unknown[]): unknown {
    return `${value}₹`;
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alertas',
  template: `
    <p style="margin: 0;" [class]="color">* {{mensaje}}</p>
  `
})
export class AlertasComponent {
  
  @Input() color!: string;
  @Input() mensaje!: string;

}

import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  variant = input<'filled' | 'outline' | 'ghost'>('filled');
  type = input<'button' | 'submit'>('button');
  disabled = input<boolean>(false);

  clicked = output<void>();

  onClick(): void {
    if (this.disabled()) return;
    this.clicked.emit();
  }
}

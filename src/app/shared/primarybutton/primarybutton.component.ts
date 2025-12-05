import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-primarybutton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primarybutton.component.html',
  styleUrls: ['./primarybutton.component.css']
})
export class PrimarybuttonComponent {
  @Input() label = '';
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'success' | 'info' | 'warning' = 'primary';
  @Input() size: 'btn-sm' | 'btn-md' | 'btn-lg' = 'btn-md';
  @Input() disabled = false;
  @Input() loading = false;
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}

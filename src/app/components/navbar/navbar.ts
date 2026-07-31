import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  themeService = inject(ThemeService);
  searchQuery = signal('');

  onSearch(): void {
    const query = this.searchQuery().trim();
    if (query) {
      console.log('Searching for:', query);
    }
  }
}

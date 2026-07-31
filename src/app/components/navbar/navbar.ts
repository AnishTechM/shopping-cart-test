import { Component, inject, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, RouterLink],
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

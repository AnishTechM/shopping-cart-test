import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products implements OnInit {
  public users: User[] = [];

  loading = false;
  errorMessage = '';
  searchText = '';

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  get filteredUsers(): User[] {
    return this.users.filter((user) => {
      const search = this.searchText.toLowerCase();

      return user.name.toLowerCase().includes(search) || user.phone.toLowerCase().includes(search);
    });
  }

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser(): void {
    this.loading = true;

    this.userService.getUsers().subscribe({
      next: (response: User[]) => {
        this.users = response;
        this.loading = false;
      },

      error: () => {
        this.errorMessage = 'Failed to load users';
        this.loading = false;
      },
    });
  }

  ShowProducts(): void {
    this.router.navigate(['/products']);
  }
}

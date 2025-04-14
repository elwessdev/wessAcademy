import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: "./users.component.html",
})
export class UsersComponent {
  customers = [
    { 
      name: 'John', 
      email: 'USA', 
      major: 'ABC Corp', 
      joined_date: 'Sarah' 
    },
  ];
}

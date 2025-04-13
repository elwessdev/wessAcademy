import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-courses',
  imports: [FormsModule, Select, ButtonModule, InputIcon, IconField, InputTextModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  cities: City[] | undefined;
  selectedCity: City | undefined;

  constructor(private router: Router) {}

  goToEditor() {
    this.router.navigate(['/editor']);
  }

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }
}

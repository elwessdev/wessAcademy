import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { CoursesApiService } from '../../services/courses-api.service';
import { CommonModule } from '@angular/common';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-courses',
  imports: [FormsModule, Select, ButtonModule, InputIcon, IconField, InputTextModule,CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses: any[] = [];
  majors: City[] | undefined;
  selectedMajor: City | undefined;

  constructor(private router: Router, private CoursesAPI: CoursesApiService) {}

  ngOnInit() {
    this.majors = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];

    this.CoursesAPI.getCourses().subscribe({
      next: (data) => {
        console.log('get courses data', data);
        this.courses = data;
      },
      error: (err) => console.error('get courses error', err)
    });
  }

  goToEditor() {
    this.router.navigate(['/editor']);
  }

  deleteCourse(courseID: number) {
    this.CoursesAPI.deleteCourse(courseID).subscribe({
      next: (data) => {
        console.log('delete course data', data);
        this.courses = this.courses.filter(course => course.id !== courseID);
      },
      error: (err) => console.error('delete course error', err)
    });
  }

}

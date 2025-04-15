import { Component } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { MultiSelectModule } from 'primeng/multiselect';
import { CoursesApiService } from '../../../services/courses-api.service';

@Component({
    selector: 'app-courseEditor',
    standalone: true,
    imports: [FormsModule,InputTextModule,TextareaModule,ButtonModule,CommonModule,QuillModule,MultiSelectModule],
    templateUrl: './courseEditor.component.html',
    // styleUrls: ['./courseEditor.component.scss']
})
export class CourseEditor {
    newCourseData: any = {};
    title: string = '';
    description: string = '';
    courseImage: string = '';
    errorMessage: string = '';
    sections: any = [
        {
            number: 1,
            title: '',
            description: '',
            content: "",
        }
    ];
    majors: any[] = [];
    selectedMajor: any[] = [];

    constructor(private CoursesAPI: CoursesApiService){}

    ngOnInit() {
        this.majors= [
            {name: "Computer Science", code: "Computer Science"},
            {name: "Information Technology", code: "Information Technology"},
            {name: "Software Engineering", code: "Software Engineering"},
            {name: "Data Science", code: "Data Science"},
            {name: "Cyber Security", code: "Cyber Security"},
            {name: "Artificial Intelligence", code: "Artificial Intelligence"},
        ]
    }

    addSection() {
        const newId = this.sections.length + 1;
        this.sections.push({
            number: newId,
            title: '',
            description: '',
            content: '',
        });
    }

    removeSection(index: number) {
        this.sections.splice(index, 1);
        this.sections.forEach((section:any, i:any) => {
            section.number = i + 1;
        });
    }

    saveCourse(){
        this.errorMessage = '';
        if(!this.title || !this.description || !this.courseImage){
            this.errorMessage = 'Please fill in all fields.';
            return;
        }
        this.sections.forEach((section:any) => {
            if(!section.title || !section.description || !section.content){
                this.errorMessage = 'Please fill in all fields.';
                return;
            }
        });
        let majorsList = "";
        this.selectedMajor.forEach((major:any) => {
            majorsList += major.name + ", ";
        });
        this.newCourseData = {
            title: this.title,
            description: this.description,
            courseImage: this.courseImage,
            majors: majorsList.slice(0, -2),
            sections: this.sections
        }
        console.log(this.newCourseData);
        this.CoursesAPI.addCourse(this.newCourseData).subscribe({
            next: (data) => {
                console.log('add course data', data);
            }
            , error: (err) => {
                console.error('add course error', err);
                this.errorMessage = 'Error adding course. Please try again.';
            }
        });
    }
}

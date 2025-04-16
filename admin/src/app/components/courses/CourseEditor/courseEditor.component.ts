import { Component } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { MultiSelectModule } from 'primeng/multiselect';
import { Message } from 'primeng/message';
import { CoursesApiService } from '../../../services/courses-api.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { OverviewApiService } from '../../../services/overview-api.service';

@Component({
    selector: 'app-courseEditor',
    standalone: true,
    imports: [
        FormsModule,
        InputTextModule,
        TextareaModule,
        ButtonModule,
        CommonModule,
        QuillModule,
        MultiSelectModule,
        Message,
        Toast
    ],
    templateUrl: './courseEditor.component.html',
    providers: [MessageService],
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

    constructor(
        private router: Router, 
        private CoursesAPI: CoursesApiService, 
        private messageService: MessageService,
        private overviewAPI: OverviewApiService
    ){}

    ngOnInit() {
        this.overviewAPI.getMajors().subscribe({
            next: (data) => {
                // console.log('get majors data', data);
                this.majors = data.map((major: any) => ({
                    name: major.major_name.split("-").join(" "),
                    code: major.major_name
                }));
            },
            error: (err) => {
                console.error('get majors error', err);
            }
        });
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
        if (this.sections.length <= 1) {
            return;
        }
        this.sections.splice(index, 1);
        this.sections.forEach((section: any, i: number) => {
            section.number = i + 1;
        });
        console.log('remove section', index);
    }

    saveCourse(){
        this.errorMessage = '';
        if(!this.title.length || !this.description.length || !this.courseImage.length || this.selectedMajor.length == 0){
            this.errorMessage = 'Please fill Basics Information';
            return;
        }
        let isSectionValid = false;
        this.sections.forEach((section:any) => {
            if(!section.title.length || !section.description.length || !section.content.length){
                isSectionValid = true;
                return;
            }
        });
        if(isSectionValid){
            this.errorMessage = 'Please fill all sections';
            return;
        }
        let majorsList = "";
        this.selectedMajor.forEach((major:any) => {
            majorsList += major.code + ", ";
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
                // console.log('add course data', data);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Course added successfully' });
                setTimeout(() => {
                    this.router.navigate(['/courses']);
                }, 1300);
            }
            , error: (err) => {
                console.error('add course error', err);
                this.errorMessage = 'Error adding course. Please try again.';
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something wrong, try again' });
            }
        });
    }

    cancelEditor(){
        this.router.navigate(['/courses']);
    }
}

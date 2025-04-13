import { Component } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

@Component({
    selector: 'app-courseEditor',
    standalone: true,
    imports: [FormsModule,InputTextModule,TextareaModule,ButtonModule,CommonModule,QuillModule],
    templateUrl: './courseEditor.component.html',
    // styleUrl: './courses.component.scss'
})
export class CourseEditor {
    title: string = '';
    description: string = '';
    sections: any = [
        {
            id: 1,
            title: '',
            description: '',
            content: "",
        }
    ];

    addSection() {
        const newId = this.sections.length + 1;
        this.sections.push({
            id: newId,
            title: '',
            description: '',
            content: '',
        });
    }

    removeSection(index: number) {
        this.sections.splice(index, 1);
        this.sections.forEach((section:any, i:any) => {
            section.id = i + 1;
        });
    }
}

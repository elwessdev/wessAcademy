import type { Routes } from "@angular/router"
import { OverviewComponent } from "./components/overview/overview.component"
import { CoursesComponent } from "./components/courses/courses.component"
import { CourseEditor } from "./components/courses/CourseEditor/courseEditor.component"

export const routes: Routes = [
    { path: "", redirectTo: "overview", pathMatch: "full" },
    { path: "overview", component: OverviewComponent },
    { path: "courses", component: CoursesComponent },
    { path: "editor", component: CourseEditor },
    { path: "**", redirectTo: "" },
]
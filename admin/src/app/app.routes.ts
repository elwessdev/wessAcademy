import type { Routes } from "@angular/router"
import { OverviewComponent } from "./components/Overview/overview.component"

export const routes: Routes = [
    { path: "", component: OverviewComponent },
    { path: "**", redirectTo: "" },
]

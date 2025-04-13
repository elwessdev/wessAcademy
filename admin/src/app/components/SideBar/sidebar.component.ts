import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink, RouterLinkActive } from "@angular/router"

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./sidebar.component.html",
  styles: [
    `
    :host {
      display: block;
      height: 100%;
    }
    
    .bg-clip-text {
      -webkit-background-clip: text;
      background-clip: text;
    }
  `,
  ],
})
export class SidebarComponent {
  navItems = [
    { label: "Overview", route: "/overview", icon: "fas fa-chart-pie" },
    { label: "Courses", route: "/courses", icon: "fas fa-chalkboard-user" },
    { label: "Users", route: "/users", icon: "fas fa-users" },
  ]
}

import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ChartModule } from "primeng/chart"
import { CardModule } from "primeng/card"
import { ButtonModule } from "primeng/button"
import { DropdownModule } from "primeng/dropdown"
import { FormsModule } from "@angular/forms"

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, ChartModule, CardModule, ButtonModule, DropdownModule, FormsModule],
    templateUrl:"./overview.component.html",
    styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent {
    selectedTimeRange: any
    // timeRanges = [
    //     { name: "Last 7 days", code: "7d" },
    //     { name: "Last 30 days", code: "30d" },
    //     { name: "Last 90 days", code: "90d" },
    //     { name: "This year", code: "year" },
    // ]
    summaryStats = [
        {
            label: "Total Users",
            value: "5",
            icon: "fas fa-users",
            iconBg: "bg-indigo-500",
        },
        {
            label: "Total Courses",
            value: "600",
            icon: "fas fa-chalkboard-user",
            iconBg: "bg-indigo-500",
        },
        {
            label: "Total Major",
            value: "5",
            icon: "fas fa-graduation-cap",
            iconBg: "bg-indigo-500",
        },
    ]

    TrafficCoursesData: any
    MajorData: any

    chartOptions: any
    pieChartOptions: any

    ngOnInit() {
        // this.selectedTimeRange = this.timeRanges[0]

        this.initChartData()
        this.initChartOptions()
    }

    initChartData() {
        this.TrafficCoursesData = {
            labels: ["PHP", "Java", "Python", "JavaScript", "C#"],
            datasets: [
                {
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: ["#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
                },
            ],
        }
        this.MajorData = {
            labels: ["CS", "Electrical Eng", "Mechanical Eng"],
            datasets: [
                {
                    data: [58, 32, 10],
                    backgroundColor: ["#6366f1", "#3b82f6", "#10b981"],
                },
            ],
        }
    }

    initChartOptions() {
        this.chartOptions = {
            plugins: {
                legend: {
                position: "top",
                align: "end",
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                    size: 12,
                    },
                },
                },
            },
            scales: {
                x: {
                grid: {
                    display: false,
                },
                },
                y: {
                grid: {
                    borderDash: [2, 2],
                },
                beginAtZero: true,
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            }

            this.pieChartOptions = {
            plugins: {
                legend: {
                position: "right",
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                    size: 12,
                    },
                },
                },
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    }
}

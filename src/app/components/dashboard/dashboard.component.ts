import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    totalProjects: number = 10;
    totalEmployees: number = 50;
    activeProjects: number = 5;

    constructor() { }

    ngOnInit(): void {
    }

}

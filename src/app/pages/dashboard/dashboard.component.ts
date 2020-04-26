import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

declare function init_plugins();
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        init_plugins();
    }

    logout(){
        this.userService.logout();
    }

}

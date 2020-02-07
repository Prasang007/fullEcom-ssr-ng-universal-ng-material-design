import { Order } from './../../../orders';
import { Router } from '@angular/router';
import { User } from './../../../users';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent implements OnInit {
  filter = '';
  users: User[] = [];
  orders: Order[] = [];
  constructor(private shared: SharedService, private router: Router) { }

  ngOnInit() {
    this.shared.setTitle('All Users');
    this.fetchUsers();
    this.shared.getNotification().subscribe(notifs => {
      notifs.forEach(notif => {
        if (notif.status === 'Unread') {
          this.shared.unreadNotifs = this.shared.unreadNotifs + 1;
        }
      });
      this.shared.notifications = notifs.reverse();
    });
  }
  fetchUsers() {
    this.shared.getUsers().subscribe( users => {
      this.users = users;
    });
  }
  userInfo(user: User) {
    this.router.navigateByUrl('/users/' + user._id, { state: {data: user}});
  }
}

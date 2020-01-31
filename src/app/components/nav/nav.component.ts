import { SharedService } from 'src/app/shared/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public shared: SharedService) { }
  page: string;
  isAdmin: boolean;

  ngOnInit() {
    this.page = this.shared.getPage();
    this.isAdmin = this.shared.checkAdmin();
  }
  toggleAdmin() {
    this.shared.isAdmin = !this.shared.isAdmin;
  }

}

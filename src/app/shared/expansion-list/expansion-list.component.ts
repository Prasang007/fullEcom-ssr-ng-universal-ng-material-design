import { User } from './../../users';
import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/orders';

@Component({
  selector: 'app-expansion-list',
  templateUrl: './expansion-list.component.html',
  styleUrls: ['./expansion-list.component.css']
})
export class ExpansionListComponent implements OnInit {
  @Input() received: User ;
  @Input() orders?: Order[];
  constructor() { }

  ngOnInit() {
  }

}

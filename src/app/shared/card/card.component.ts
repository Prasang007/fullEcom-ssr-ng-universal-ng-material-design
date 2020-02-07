import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from './card';
import { Order } from 'src/app/orders';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() received: Card ;
  @Input() description?: string;
  @Input() orders?: Order[] = [];
  @Output() clicked = new EventEmitter();

  isProduct: boolean;
  constructor() { }

  ngOnInit() {
    this.received.description = this.description;
  }
  gotClicked() {
    this.clicked.emit();
  }
}


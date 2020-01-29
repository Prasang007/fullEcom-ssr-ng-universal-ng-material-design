import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ExpansionListComponent } from './expansion-list/expansion-list.component';
import { OrderComponent } from './order/order.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [CardComponent, ExpansionListComponent, OrderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    CardComponent,
    ExpansionListComponent,
    OrderComponent,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: []
})
export class SharedModule { }

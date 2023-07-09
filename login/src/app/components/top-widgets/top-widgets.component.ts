import { Component, Input } from '@angular/core';
import {
  faLocation,
  faShop,
  faBoxes,
  faMoneyBill,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.css']
})
export class TopWidgetsComponent {

  faLocation = faLocation;
  faShop = faShop;
  faBoxes = faBoxes;
  faMoneyBill = faMoneyBill;
  faCheck =faCheck;

  @Input() score: any;
}

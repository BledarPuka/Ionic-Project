import { Component, Input } from '@angular/core';
import { Place } from '../../place.model';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent {
  @Input() offer!: Place;
  constructor() {}
  getDummyDate() {
    return new Date();
  }
}

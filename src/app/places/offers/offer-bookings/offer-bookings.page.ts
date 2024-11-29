import { Component, inject, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  place!: Place;
  private route = inject(ActivatedRoute);
  private navCtrl = inject(NavController);
  private placesService = inject(PlacesService);
  constructor() {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const placeId = paramMap.get('placeId');
      if (!placeId) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }

      const fetchedPlace = this.placesService.getPlace(placeId);
      if (!fetchedPlace) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }

      this.place = fetchedPlace;
    });
  }
}

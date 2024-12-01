import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  place!: Place;
  private route = inject(ActivatedRoute);
  private navCtrl = inject(NavController);
  private placesService = inject(PlacesService);
  private placesSub: Subscription = new Subscription();
  constructor() {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const placeId = paramMap.get('placeId');
      if (!placeId) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }

      this.placesSub = this.placesService
        .getPlace(placeId)
        .subscribe((places) => {
          this.place = places;
        });
    });
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}

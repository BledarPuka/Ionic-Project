import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage {
  place!: Place;
  private route = inject(ActivatedRoute);
  private placesService = inject(PlacesService);
  private navCtrl = inject(NavController);
  private modalCtrl = inject(ModalController);

  constructor() {
    this.route.paramMap.subscribe((paramMap) => {
      const placeId = paramMap.get('placeId');
      if (!placeId) {
        this.navCtrl.navigateBack('/places/discover');
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

  onBokkPlace() {
    // this.router.navigateByUrl('/places/discover');
    // this.navCtrl.navigateBack('/places/discover');
    // this.navCtrl.pop();
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm') {
          console.log('BOOKED!');
        }
      });
  }
}

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings!: Booking[];
  private bookingService = inject(BookingService);
  private bookingSub: Subscription = new Subscription();
  private loadingCtrl = inject(LoadingController);

  constructor() {}

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe((booking) => {
      this.loadedBookings = booking;
    });
  }
  onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    this.loadingCtrl.create({ message: 'Cancelling...' }).then((loadingEl) => {
      loadingEl.present();
      slidingEl.close();
      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }
  ngOnDestroy(): void {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}

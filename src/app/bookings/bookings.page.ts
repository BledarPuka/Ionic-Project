import { Component, inject, OnInit } from '@angular/core';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBookings!: Booking[];
  private bookingService = inject(BookingService);

  constructor() {}

  ngOnInit() {
    this.loadedBookings = this.bookingService.bookings;
  }
  onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
  }
}

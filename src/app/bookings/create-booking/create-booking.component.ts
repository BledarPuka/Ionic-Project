import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Place } from '../../places/place.model';
import { ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @ViewChild('f', { static: true }) form: NgForm | any;
  @Input() selectedPlace: Place | undefined;
  private modalCtrl = inject(ModalController);
  @Input()
  selectedMode!: 'select' | 'random';

  minDefaultDate: string = '';
  maxDefaultDate: string = '';
  minRandomDate: string = ''; // startDate
  maxRandomDate: string = ''; // endDate

  constructor() {}
  ngOnInit(): void {
    if (
      this.selectedPlace?.availableFrom != null &&
      this.selectedPlace?.availableTo != null
    ) {
      this.minDefaultDate = formatDate(
        this.selectedPlace.availableFrom,
        'yyyy-MM-dd',
        'en-US'
      );
      this.maxDefaultDate = formatDate(
        this.selectedPlace.availableTo,
        'yyyy-MM-dd',
        'en-US'
      );
    }

    if (this.selectedMode == 'random') {
      this.minRandomDate = this.generateRandomDate(
        new Date(this.minDefaultDate),
        new Date(this.maxDefaultDate)
      );
      this.maxRandomDate = this.generateRandomDate(
        new Date(this.minRandomDate),
        new Date(this.maxDefaultDate)
      );
    } else {
      this.minRandomDate = formatDate(
        this.minDefaultDate,
        'yyyy-MM-dd',
        'en-US'
      );
      this.maxRandomDate = formatDate(
        this.maxDefaultDate,
        'yyyy-MM-dd',
        'en-US'
      );
    }
  }

  generateRandomDate(
    from: { getTime: () => number },
    to: { getTime: () => number }
  ) {
    const fromPlus1Day = from.getTime() + 24 * 60 * 60 * 1000 * 1;
    const dateRandom = new Date(
      fromPlus1Day + Math.random() * (to.getTime() - fromPlus1Day)
    );
    const dateString = formatDate(dateRandom, 'yyyy-MM-dd', 'en-US');
    console.log('dateString: ' + dateString);

    return dateString;
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    if (!this.form.valid || !this.datesValid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        bookingData: {
          firstName: this.form.value['first-name'],
          lastName: this.form.value['last-name'],
          guestNumber: +this.form.value['guest-number'],
          startDate: new Date(this.form.value['date-from']),
          endDate: new Date(this.form.value['date-to']),
        },
      },
      'confirm'
    );
  }

  datesValid() {
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);
    return endDate > startDate;
  }
}

import { Component, inject, Input } from '@angular/core';
import { Place } from '../../places/place.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent {
  @Input() selectedPlace: Place | undefined;
  private modalCtrl = inject(ModalController);
  constructor() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  onBokkPlace() {
    this.modalCtrl.dismiss({ message: 'This is a message' }, 'confirm');
  }
}

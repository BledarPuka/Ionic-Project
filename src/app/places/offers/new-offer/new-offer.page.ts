import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from, min } from 'rxjs';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form!: FormGroup;
  private placesService = inject(PlacesService);
  private router = inject(Router);
  private loadingCtrl = inject(LoadingController);

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)],
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }
  onCreateOffer() {
    if (this.form.valid) {
      const formValue = this.form.value;

      // Format the dates to 'YYYY-MM-DD'
      const formattedDateFrom = formValue.dateFrom
        ? new Date(formValue.dateFrom).toISOString().split('T')[0]
        : null;
      const formattedDateTo = formValue.dateTo
        ? new Date(formValue.dateTo).toISOString().split('T')[0]
        : null;

      const formattedForm = {
        ...formValue,
        dateFrom: formattedDateFrom,
        dateTo: formattedDateTo,
      };
      this.loadingCtrl
        .create({
          message: 'Creating place...',
        })
        .then((loadingEl) => {
          loadingEl.present();
          this.placesService
            .addPlace(
              this.form.value.title,
              this.form.value.description,
              +this.form.value.price,
              new Date(this.form.value.dateFrom),
              new Date(this.form.value.dateTo)
            )
            .subscribe(() => {
              loadingEl.dismiss();
              this.form.reset();
              this.router.navigate(['/places/offers']);
            });
        });
    } else {
      console.error('Form is invalid:', this.form);
    }
  }
}

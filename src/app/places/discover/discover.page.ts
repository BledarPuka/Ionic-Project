import { Component, inject, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedPlaces!: Place[];
  private placesService = inject(PlacesService);
  private menuCtrl = inject(MenuController);
  constructor() {}

  ngOnInit() {
    this.loadedPlaces = this.placesService.places;
  }
  onOpenMenu() {
    this.menuCtrl.toggle();
  }
}

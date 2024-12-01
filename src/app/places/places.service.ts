import { inject, Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://media.istockphoto.com/id/1484278497/photo/landscape-with-milky-way-and-silhouette-of-a-hiker-man.jpg?s=612x612&w=0&k=20&c=SemVG8A3s8RIpHhBUsdCCpaXzdI-H4UsNHfS2dGvtaU=',
      149.99,
      new Date('2025-05-01'),
      new Date('2027-05-01'),
      'abc'
    ),
    new Place(
      'p2',
      "L'Amour Toujours",
      'A romantic place in Paris!',
      'https://guidebook.isango.com/wp-content/uploads/2022/04/pexels-pixabay-2363.jpg',
      189.99,
      new Date('2025-05-01'),
      new Date('2027-05-01'),
      'abc'
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://img.freepik.com/premium-photo/neuschwanstein-castle-against-sky-foggy-weather_1048944-5047543.jpg?semt=ais_hybrid',
      99.99,
      new Date('2025-05-01'),
      new Date('2027-05-01'),
      'xyz'
    ),
  ]);

  private authService = inject(AuthService);

  get places() {
    return this._places.asObservable();
  }

  constructor() {}

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => {
        // const place = this.places.find((p) => p.id === id);
        // return place ? { ...place } : undefined;
        return { ...places.find((p) => p.id === id) };
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://img.freepik.com/premium-photo/neuschwanstein-castle-against-sky-foggy-weather_1048944-5047543.jpg?semt=ais_hybrid',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        this._places.next(places.concat(newPlace));
      })
    );
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );
  }
}

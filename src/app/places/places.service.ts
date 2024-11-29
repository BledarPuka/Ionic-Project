import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://media.istockphoto.com/id/1484278497/photo/landscape-with-milky-way-and-silhouette-of-a-hiker-man.jpg?s=612x612&w=0&k=20&c=SemVG8A3s8RIpHhBUsdCCpaXzdI-H4UsNHfS2dGvtaU=',
      149.99
    ),
    new Place(
      'p2',
      "L'Amour Toujours",
      'A romantic place in Paris!',
      'https://guidebook.isango.com/wp-content/uploads/2022/04/pexels-pixabay-2363.jpg',
      189.99
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://img.freepik.com/premium-photo/neuschwanstein-castle-against-sky-foggy-weather_1048944-5047543.jpg?semt=ais_hybrid',
      99.99
    ),
  ];

  get places() {
    return [...this._places];
  }

  constructor() {}

  getPlace(id: string): Place | undefined {
    const place = this._places.find((p) => p.id === id);
    return place ? { ...place } : undefined;
  }
}

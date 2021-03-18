import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {City} from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private citiesUrl: string;

  constructor(private http: HttpClient) {
    this.citiesUrl = 'http://localhost:8080';
  }

  public findAll(): Observable<City[]> {
    return this.http.get<City[]>(this.citiesUrl);
  }

  public delete(city: City): Observable<City> {
    return this.http.delete<City>(this.citiesUrl + '/' + city.id);
  }

  public update(city: City): Observable<City> {
    return this.http.put<City>(this.citiesUrl, city);
  }

  public create(city: City): Observable<City> {
    return this.http.post<City>(this.citiesUrl, city);
  }
}

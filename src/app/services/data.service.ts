import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { People } from '../models/people.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  peoplesUrl = '/api/people';
  pplanetsUrl = '/api/planets/';
  peopleSubject = new Subject();
  peoplesList: People[] = []

  constructor(private http: HttpClient) { }

  fetchPeopleList() {
    this.http.get(this.peoplesUrl).subscribe((peopleData: any) => {
      if (peopleData && peopleData.results.length > 0) {
        peopleData.results.forEach((data: any) => {
          this.http.get(this.pplanetsUrl + data.homeworld.split('planets/')[1]).subscribe((planetData: any) => {
            this.peoplesList = Object.assign([], this.peoplesList);
            this.peoplesList.push(
              {
                name: data.name,
                height: data.height,
                mass: data.mass,
                created: data.created,
                edited: data.edited,
                planet: {
                  name: planetData.name,
                  diameter: planetData.diameter,
                  climate: planetData.climate,
                  population: planetData.population
                }
              }
            )
            this.peopleSubject.next(this.peoplesList);
          })
        });
      }
    })
    return this.peopleSubject;
  }
}

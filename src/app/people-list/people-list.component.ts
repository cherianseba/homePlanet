import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState, getAllPeoples } from '../app.store';
import { People } from '../models/people.model';
import { PlanetViewComponent } from '../planet-view/planet-view.component';
import { Planet } from './../models/planet.model';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns = ['name', 'height', 'mass', 'created', 'edited', 'planet'];
  public peoplesData = [];
  filteredPersonVal = ' ';
  public dataSource = new MatTableDataSource<People>();
  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit() {
    this.store.select(getAllPeoples).subscribe((peoplesData: any) => {
      this.peoplesData = peoplesData;
      this.dataSource.data = peoplesData;
      this.dataSource.sort = this.sort;
    });
  }

  filterByPersonsName() {
    let filterValue = this.filteredPersonVal.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onClickPlanet(planet: Planet) {
    this.dialog.open(PlanetViewComponent, {
      panelClass: 'view-planet-container',
      data: planet
    });
  }

  pageChanged(event: PageEvent) {
    const data = [...this.peoplesData];
    this.dataSource.data = data.splice((event.pageIndex - 1) * event.pageSize, event.pageSize );
  }
}

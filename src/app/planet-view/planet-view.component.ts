import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-planet-view',
  templateUrl: './planet-view.component.html',
  styleUrls: ['./planet-view.component.scss']
})
export class PlanetViewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PlanetViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { peopleReducer } from './app.store';
import { PeopleListComponent } from './people-list/people-list.component';
import { DataService } from './services/data.service';
import { MaterialModule } from './shared/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanetViewComponent } from './planet-view/planet-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    PlanetViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot({peoples: peopleReducer}),
    EffectsModule.forRoot([AppEffects]),
  ],
  exports: [PlanetViewComponent],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

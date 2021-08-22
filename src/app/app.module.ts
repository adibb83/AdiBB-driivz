import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material-module/material.module';
import { MainPageComponent } from '@pages/main-page/main-page.component';
import { LocationRefComponent } from './components/location-ref/location-ref.component';
import { MapComponent } from './components/map/map.component';
import { ReportTableComponent } from './components/report-table/report-table.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AddLocationDialogComponent } from './components/add-location-dialog/add-location-dialog.component';
import { SataService } from '@services/sata-service/sata.service';
import { StateManagerService } from '@services/state-manager.service';
import { ClockComponent } from './components/clock/clock.component';
import { CurrentPostionComponent } from './components/current-postion/current-postion.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LocationRefComponent,
    MapComponent,
    ReportTableComponent,
    AddLocationDialogComponent,
    ClockComponent,
    CurrentPostionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    GoogleMapsModule,
  ],
  providers: [SataService, StateManagerService],
  bootstrap: [AppComponent],
})
export class AppModule {}

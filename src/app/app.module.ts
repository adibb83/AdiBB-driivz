import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material-module/material.module';
import { MainPageComponent } from '@pages/main-page/main-page.component';
import { LocationRefComponent } from './components/location-ref/location-ref/location-ref.component';
import { MapComponent } from './components/map/map/map.component';
import { ReportTableComponent } from './components/report-table/report-table/report-table.component';

@NgModule({
  declarations: [AppComponent, MainPageComponent, LocationRefComponent, MapComponent, ReportTableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

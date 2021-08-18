import { Component, OnDestroy, OnInit } from '@angular/core';
import { SataService } from '@services/sata.service';
import { ISata } from '@models/sata.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddLocationDialogComponent } from '@components/add-location-dialog/add-location-dialog.component';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  zoom = 3;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'satellite',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 10,
    minZoom: 3,
  };

  constructor(public sataService: SataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.sub = this.sataService.mapLocation$.subscribe((loc: ISata | null) => {
      if (loc != null) {
        this.setLocation(loc);
      }
    });
  }

  setLocation(loc: ISata) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: Number.parseFloat(loc.iss_position.latitude),
        lng: Number.parseFloat(loc.iss_position.longitude),
      };
      if (this.zoom !== this.sataService.zoom) {
        this.zoom = this.sataService.zoom;
      }
    });
  }

  addPositionToLog() {
    const dialogRef = this.dialog.open(AddLocationDialogComponent, {
      data: {
        currentLocation: this.sataService.lastPosition,
      },
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SataService } from '@services/sata.service';
import { ISata } from '@models/sata.model';
import { SnackbarService } from '@services/snack-bar.service';

@Component({
  selector: 'app-add-location-dialog',
  templateUrl: './add-location-dialog.component.html',
  styleUrls: ['./add-location-dialog.component.scss'],
})
export class AddLocationDialogComponent implements OnInit {
  locationForm = new FormGroup({
    location_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  constructor(
    public dialogRef: MatDialogRef<AddLocationDialogComponent>,
    public sataService: SataService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      currentLocation: ISata;
    }
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const name = this.locationForm.get('location_name')?.value;
    if (this.sataService.sataLocationLog.find((loc) => loc.name === name)) {
      this.snackbarService.append({
        message: 'location name already exists',
        type: 'warning',
      });
    } else {
      this.data.currentLocation.name = name;
      this.sataService.saveLocationToLog(this.data.currentLocation);
      this.dialogRef.close(false);
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}

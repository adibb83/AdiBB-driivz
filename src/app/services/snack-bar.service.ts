import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnakbarModel } from '@models/snakbar.model';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  append(snakbarModel: SnakbarModel) {
    this.snackBar.open(snakbarModel.message, 'close', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: 'snack-style',
    });
  }
}

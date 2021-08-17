import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

const MATERIAL_IMPORTS = [
  CommonModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatDialogModule,
];

@NgModule({
  declarations: [],
  imports: MATERIAL_IMPORTS,
  exports: MATERIAL_IMPORTS,
})
export class MaterialModule {}

import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

const AngularMaterialModules = [
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatMenuModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatListModule,
  MatDatepickerModule,
  MatDialogModule,
  MatCardModule,
  MatTabsModule,
  MatSnackBarModule,
  ScrollingModule,
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AngularMaterialModules],
  exports: [CommonModule, ReactiveFormsModule, AngularMaterialModules],
})
export class SharedModule {}

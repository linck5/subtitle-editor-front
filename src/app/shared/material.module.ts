import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatChipsModule, MatSelectModule, MatCardModule, MatIconModule, MatToolbarModule,
  MatListModule, MatCheckboxModule, MatButtonToggleModule, MatDatepickerModule,
  MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule,
  MatNativeDateModule, MatProgressSpinnerModule, MatSortModule, MatDialogModule 
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    MatChipsModule, MatSelectModule, MatCardModule, MatIconModule, MatToolbarModule,
    MatListModule, MatCheckboxModule, MatButtonToggleModule, MatDatepickerModule,
    MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatNativeDateModule, MatProgressSpinnerModule, MatMenuModule
  ],
  declarations: [],
  exports: [
    MatChipsModule, MatSelectModule, MatCardModule, MatIconModule, MatToolbarModule,
    MatListModule, MatCheckboxModule, MatButtonToggleModule, MatDatepickerModule,
    MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatNativeDateModule, MatTableModule, MatSortModule, MatProgressSpinnerModule, MatMenuModule, MatDialogModule
  ]
})
export class MaterialModule { }

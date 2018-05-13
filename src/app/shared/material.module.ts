import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatChipsModule, MatSelectModule, MatCardModule, MatIconModule, MatToolbarModule,
  MatListModule, MatCheckboxModule, MatButtonToggleModule, MatDatepickerModule,
  MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule,
  MatNativeDateModule, MatProgressSpinnerModule
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    MatChipsModule, MatSelectModule, MatCardModule, MatIconModule, MatToolbarModule,
    MatListModule, MatCheckboxModule, MatButtonToggleModule, MatDatepickerModule,
    MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatNativeDateModule, MatProgressSpinnerModule
  ],
  declarations: [],
  exports: [
    MatChipsModule, MatSelectModule, MatCardModule, MatIconModule, MatToolbarModule,
    MatListModule, MatCheckboxModule, MatButtonToggleModule, MatDatepickerModule,
    MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatNativeDateModule, MatTableModule, MatProgressSpinnerModule
  ]
})
export class MaterialModule { }

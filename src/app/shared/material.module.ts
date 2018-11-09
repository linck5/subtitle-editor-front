import { NgModule } from '@angular/core';
import {
  MatChipsModule, MatSelectModule, MatCardModule, MatIconModule, MatToolbarModule,
  MatListModule, MatCheckboxModule, MatButtonToggleModule, MatDatepickerModule,
  MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule,
  MatNativeDateModule, MatProgressSpinnerModule, MatSortModule, MatDialogModule, MatRadioModule
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  exports: [
    MatChipsModule, MatSelectModule, MatCardModule, MatIconModule, MatToolbarModule,
    MatListModule, MatCheckboxModule, MatButtonToggleModule, MatDatepickerModule,
    MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatNativeDateModule, MatTableModule, MatSortModule, MatProgressSpinnerModule, MatMenuModule, MatDialogModule, MatRadioModule
  ]
})
export class MaterialModule { }

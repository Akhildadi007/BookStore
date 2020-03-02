import { NgModule } from '@angular/core';

// Angular Materials Module
import { MatMenuModule, MatIconModule, MatCardModule, MatButtonModule,
          MatExpansionModule, MatFormFieldModule, MatSelectModule, MatInputModule, 
          MatSnackBarModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

@NgModule({
  exports: [
    MatMenuModule, 
    MatIconModule, 
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ]
})
export class MaterialModule { }
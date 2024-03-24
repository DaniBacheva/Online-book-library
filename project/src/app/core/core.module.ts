import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ConformModalComponent } from './conform-modal/conform-modal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    ConformModalComponent,
   

  ],
  imports: [
    CommonModule, RouterModule
  ], 
  exports: [HeaderComponent, FooterComponent, ErrorComponent, ConformModalComponent]
})
export class CoreModule { }

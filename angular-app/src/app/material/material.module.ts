import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MatButtonModule, MatIconModule, MatCardModule, CdkAccordionModule],
})
export class MaterialModule {}

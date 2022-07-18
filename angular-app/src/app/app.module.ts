import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionDisplayComponent } from './pages/question-display/question-display.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TeamComponent } from './pages/team/team.component';
import { TeamCardComponent } from './components/team-card/team-card.component';
import { ReceptionComponent } from './pages/reception/reception.component';
@NgModule({
  declarations: [AppComponent, QuestionDisplayComponent, FooterComponent, TeamComponent, TeamCardComponent, ReceptionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

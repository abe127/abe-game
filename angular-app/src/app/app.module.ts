import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionDisplayComponent } from './pages/question-display/question-display.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TeamComponent } from './pages/team/team.component';
import { TeamCardComponent } from './components/team-card/team-card.component';
import { ReceptionComponent } from './pages/reception/reception.component';
import { ScanQrComponent } from './pages/liff/scan-qr/scan-qr.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from './services/progress-spinner.service';
import { SelfIntroduceComponent } from './pages/self-introduce/self-introduce.component';
@NgModule({
  declarations: [
    AppComponent,
    QuestionDisplayComponent,
    FooterComponent,
    TeamComponent,
    TeamCardComponent,
    ReceptionComponent,
    ScanQrComponent,
    ProgressSpinnerComponent,
    SelfIntroduceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [ProgressSpinnerService],
  bootstrap: [AppComponent],
})
export class AppModule {}

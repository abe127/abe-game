import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanQrComponent } from './pages/liff/scan-qr/scan-qr.component';
import { QuestionDisplayComponent } from './pages/question-display/question-display.component';
import { ReceptionComponent } from './pages/reception/reception.component';
import { TeamComponent } from './pages/team/team.component';

const routes: Routes = [
  { path: 'reception', component: ReceptionComponent },
  { path: 'team', component: TeamComponent },
  { path: 'question-display', component: QuestionDisplayComponent },
  { path: 'scan-qr', component: ScanQrComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

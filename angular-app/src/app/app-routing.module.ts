import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionDisplayComponent } from './pages/question-display/question-display.component';

const routes: Routes = [
  { path: 'question-display', component: QuestionDisplayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

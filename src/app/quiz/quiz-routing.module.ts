import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizSolutionComponent } from './quiz-solution/quiz-solution.component';

const routes: Routes = [
  { path: '', component: QuizListComponent },
  { path: '', component: QuizSolutionComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }

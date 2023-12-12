import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizSolutionComponent } from './quiz-solution/quiz-solution.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuizListComponent,
    QuizSolutionComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    FormsModule
  ]
})
export class QuizModule { }

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quiz-solution',
  templateUrl: './quiz-solution.component.html',
  styleUrls: ['./quiz-solution.component.scss']
})
export class QuizSolutionComponent implements OnInit {
  ngOnInit() {
  }

  @Input() questionUser: string = "";
  responseUser: string = "";
  @Input() correctAnswer: string = ""; // correct answer

  @Output() responseEmitter = new EventEmitter<string>();

  emitResponse(): void {
    this.responseEmitter.emit(this.responseUser);
  }
}

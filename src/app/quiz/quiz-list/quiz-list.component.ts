



import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  // Define an array to store questions, responses, and messages
  quizzes: Quiz[] = [];
  userResponses: any;
  showAnswerForIndex: number | null = null;

  count: number = 0;
  currentIndex: number;
  currentResponse: string;
  constructor() {
    this.currentIndex = 0;  // or set it to a default index
    this.currentResponse = '';  // or set it to a default response
  }

  // Initialize the array with some questions
  ngOnInit() {
    this.quizzes = [
      {
        question: "What is the recommended daily intake of water for an average adult?",
        response: "2", message: "", res: ""
      },
      {
        question: "Which vitamin is known for its role in supporting the immune system and promoting the absorption of iron?",
        response: "C", message: "", res: ""
      },
      {
        question: "This vitamin is crucial for maintaining healthy skin, vision, and a strong immune system. Can you name it?",
        response: "A", message: "", res: ""
      },
      {
        question: "Which vitamin, often called the -sunshine vitamin- is essential for calcium absorption and bone health?",
        response: "D", message: "", res: ""
      },
    ];
  }
  comparerResultat(index: number, userResponse: string): boolean {
    const quiz = this.quizzes[index];
    if (userResponse === quiz.response) {
      quiz.message = "OK";
      quiz.res = "correct";
      return true;
    } else {
      quiz.message = "Not OK";
      quiz.res = "incorrect";
      return false;
    }
  }

  showAnswer(index: number): void {
    this.showAnswerForIndex = index;
  }


  // Modified CountResultat() function
  CountResultat(): void {
    // Iterate through the quizzes and count correct responses
    this.count = this.quizzes.filter(quiz => quiz.res === "correct").length;

    // Log the count of correct responses
    console.log("Total count of correct responses:", this.count);
  }


}



// Define a Quiz interface
interface Quiz {
  question: string;
  response: string;
  message: string;
  res: string;
}


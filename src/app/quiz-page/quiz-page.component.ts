import { Component, OnInit } from '@angular/core';
import {QuizService} from "../quiz/quiz.service";
import {QuizModel} from "../quiz/quiz.model";

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {
  questions!: QuizModel[];
  answers: string[] = [];
  question!: QuizModel;
  btnSt: string = 'default-button';
  answered: boolean = false;


  constructor(
    private QuizService: QuizService,
  ) { }

  ngOnInit(): void {
    this.QuizService.getQuestions().subscribe((questions) => {
      this.questions = questions;
      this.question = this.getQuestion();
      this.answers.push(...this.question.incorrectAnswers, this.question.correctAnswer);
    });

  }
  getQuestion(): QuizModel{
    return this.questions[Math.floor(Math.random() * this.questions.length)]
  }

  answerClick($event: any) {
    if($event === this.question.correctAnswer) {
      this.btnSt = 'correct-button';
      this.answered = true;
      setTimeout(() => {
        this.answers = [];
        this.question = this.getQuestion();
        this.answers.push(...this.question.incorrectAnswers, this.question.correctAnswer);
        this.answered = false;
        this.btnSt = 'default-button';
      },1000)
    } else {
      this.btnSt = 'wrong-button';
      setTimeout(() => {
        this.btnSt = 'default-button';
      },700)
    }
  }

}

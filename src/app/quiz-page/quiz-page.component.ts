import { Component, OnInit } from '@angular/core';
import {QuizService} from "../quiz/quiz.service";
import {QuizModel} from "../quiz/quiz.model";
import {FormControl} from "@angular/forms";

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
  list = new Map<String, String[]>();
  category = new FormControl('');
  loading: boolean = false;


  constructor(
    private QuizService: QuizService,
  ) { }

  ngOnInit(): void {
    this.QuizService.getCategoryList().subscribe((list: any) => {
      this.list = list
    })
    this.QuizService.getQuestions().subscribe((questions) => {
      this.questions = questions;
      this.question = this.getQuestion();
      this.answers.push(...this.question.incorrectAnswers, this.question.correctAnswer);
      this.answers = this.shuffleArray(this.answers);
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
        this.answers = this.shuffleArray(this.answers);
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

  onChange($event: string[]) {
    this.loading = true;
    let arr = $event.flat(1);
    let queryString = '';
    arr.forEach((elem) => {
      if(queryString === ''){
        queryString = elem
      } else {
        queryString = queryString + ',' + elem
      }
    })
    this.answers = [];
    this.QuizService.getQuestionsByCategory(queryString).subscribe((questions) => {
      this.questions = questions;
      this.question = this.getQuestion();
      this.answers.push(...this.question.incorrectAnswers, this.question.correctAnswer);
      this.answers = this.shuffleArray(this.answers);
      this.loading = false;
    });
  }
  shuffleArray(array: string[]){
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuizModel} from "./quiz.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private httpclient: HttpClient,
  ) { }

  getQuestions(){
    return this.httpclient.get<QuizModel[]>('https://the-trivia-api.com/api/questions?limit=100')
  }

  getCategoryList(){
    return this.httpclient.get<Map<String, String[]>>('https://the-trivia-api.com/api/categories')
  }

  getQuestionsByCategory(query: any){
    return this.httpclient.get<QuizModel[]>(`https://the-trivia-api.com/api/questions?categories=${query}&limit=100`)
  }
}

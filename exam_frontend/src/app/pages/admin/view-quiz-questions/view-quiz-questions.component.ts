import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css',
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any;
  qTitle: any;
  questions = [
    {
      answer: null,
      content: null,
      image: null,
      option1: null,
      option2: null,
      option3: null,
      option4: null,
      quesId: null,
      quiz: {
        active: null,
        category: {
          cid: null,
          title: null,
          description: null,
        },
        description: null,
        maxMarks: null,
        numberOfQuestion: null,
        qid: null,
        title: null,
      },
    },
  ];

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snak : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];

    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //deleting the quiz question
  deleteQuestion(qid:any){
    this._question.deleteQuestion(qid).subscribe(
      (data:any)=>{
        // filter out the deleted question from the array
        this.questions = this.questions.filter((question) => question.quesId != qid)
        this._snak.open('Question deleted Successfully','Ok',{
          duration:3000
        });
      },
      (error)=>{
        this._snak.open('Something Went Wrong','Ok',{
          duration:3000
        });
      }
    );

  }

  //update the quiz question
  updateQuestion(qid:any){
    alert(qid)
  }
}

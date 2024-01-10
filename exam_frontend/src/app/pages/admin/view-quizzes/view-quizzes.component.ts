import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'], // Fix: change styleUrl to styleUrls
})
export class ViewQuizzesComponent implements OnInit {
  quize = [
    {
      qid: null,
      title: null,
      description: null,
      maxMarks: null,
      numberOfQuestion: null,
      active: '',
      category: {
        title: null,
      },
    },
  ];

  constructor(private _quiz: QuizService, private _snak: MatSnackBar) {}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quize = data;
        console.log(this.quize);
      },
      (error) => {
        console.log(error);
        this._snak.open('Error in loading data', 'Ok', {
          duration: 3000,
        });
      }
    );
  }

  // delete quiz
  deleteQuiz(qId: any) {
    // alert(qId)
    this._quiz.deleteQuiz(qId).subscribe(
      (data: any) => {
        // Filter out the deleted quiz from the array
        this.quize = this.quize.filter((quiz) => quiz.qid != qId);
        this._snak.open('Quiz Deleted Successfully', 'Ok', {
          duration: 3000,
        });
      },
      (error) => {
        this._snak.open('Something Went Wrong', 'Ok', {
          duration: 3000,
        });
      }
    );
  }
}

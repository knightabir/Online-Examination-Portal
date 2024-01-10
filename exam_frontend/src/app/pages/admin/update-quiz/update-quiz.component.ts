import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  qId = 0;
  quiz: any;
  categories: any;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _cat: CategoryService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];

    this._quiz.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
      },
      (error) => {
        console.error(error);
        this._snackBar.open('Error loading quiz details', 'Close', { duration: 3000 });
      }
    );

    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.error(error);
        this._snackBar.open('Error loading categories', 'Close', { duration: 3000 });
      }
    );
  }

  // Update form submit
  public updateData() {
    if (!this.quiz) {
      this._snackBar.open('Please enter quiz details', 'Error', { duration: 3000 });
      return;
    }

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data: any) => {
        this._snackBar.open('Quiz updated successfully', 'Ok', { duration: 3000 });
        this._router.navigate(['/admin/quizzes']);
      },
      (error) => {
        console.error(error);
        this._snackBar.open('Failed to update quiz', 'Error', { duration: 3000 });
      }
    );
  }
}

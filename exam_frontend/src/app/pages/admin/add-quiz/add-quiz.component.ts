import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  quizData = {
    title: '',
    description: null,
    maxMarks: null,
    numberOfQuestion: null,
    active: false,
    category: null,
  };

  categories = [
    {
      cid: null,
      title: null,
    },
  ];

  constructor(
    private _cat: CategoryService,
    private _snak: MatSnackBar,
    private _quiz: QuizService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
        this._snak.open('Error loading data from the server', 'Ok', {
          duration: 3000,
        });
      }
    );
  }

  addQuiz() {
    if (!this.quizData.title.trim()) {
      this._snak.open('Title is required!', 'Ok', {
        duration: 3000,
      });
      return;
    }

    this._quiz.addQuiz(this.quizData).subscribe(
      (data: any) => {
        this._snak.open('Success! Quiz added', 'Ok', {
          duration: 3000,
        });
        // Optionally reset the form or perform other actions after successful addition
        this.resetForm();
      },
      (error) => {
        console.error(error);
        this._snak.open('Server not responding!', 'Ok', {
          duration: 3000,
        });
      }
    );
  }

  resetForm() {
    // Reset the form fields to their initial state
    this.quizData = {
      title: '',
      description: null,
      maxMarks: null,
      numberOfQuestion: null,
      active: false,
      category: null,
    };
    
  }
}

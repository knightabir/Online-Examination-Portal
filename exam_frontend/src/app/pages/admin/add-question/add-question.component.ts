import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit {

  qId:any; //it is the quiz id that comes from the url
  qTitle:any; // it is the quiz name that come from the url

  question={
    quiz:{
      qid:null
    },
    content:null,
    option1:null,
    option2:null,
    option3:null,
    option4:null,
    answer:null
  }

  constructor(private _route:ActivatedRoute ,private _question: QuestionService,private _snak:MatSnackBar){}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz.qid = this.qId;
  }
  

  formSubmit() {    
    // Perform input validation before submission
    if (!this.question) {
      this._snak.open('Please enter a question', 'Error', { duration: 3000 });
      return; // Prevent submission if question is empty
    }
  
    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        this.question.answer=null
        this.question.content=null
        this.question.option1=null
        this.question.option2=null
        this.question.option3=null
        this.question.option4=null
    
        this._snak.open('Question added successfully', 'Ok', { duration: 3000 });
        // Clear the form fields after successful submission
        
      },
      (error) => {
        // Handle errors gracefully
        this._snak.open('Failed to add question: ' + error.message, 'Error', { duration: 3000 });
        console.error(error);
      }
    );

    
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css',
})
export class UpdateQuestionComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snak: MatSnackBar
  ) {}

  quesId = 0;
  question = {
    "quesId": null,
    "content": null,
    "image": null,
    "option1": null,
    "option2": null,
    "option3": null,
    "option4": null,
    "answer": null,
    "quiz": {
      "qid": null,
      "title": null,
      "description": null,
      "maxMarks": null,
      "numberOfQuestion": null,
      "active": null,
      "category": {
        "cid": null,
        "title": null,
        "description": null
      }
    }
  } 
  categories: any;

  ngOnInit(): void {
    this.quesId = this._route.snapshot.params['quesId'];
    // alert(this.quesId); //this is the question id
    
    this._question.getQuestion(this.quesId).subscribe(
      (data:any)=>{
        this.question = data;
      },
      (error)=>{
        console.log(error)
        this._snak.open('Error loading the question','Ok',{
          duration:30000
        })
      }
    )

  }

  //update the question
  public updateQuestion() {
    if(!this.question){
      this._snak.open('Please Enter quiz details','Ok',{
        duration:3000
      })
      return
    }

    this._question.updateQuestion(this.question).subscribe(
      (data:any)=>{
        this._snak.open('Question Updated Successfully','Ok',{
          duration:3000
        })
      }
    )
  }
}

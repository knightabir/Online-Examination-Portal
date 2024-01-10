import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']  // <-- Corrected property name
})
export class InstructionsComponent implements OnInit {
  qid: any;
  quiz: any;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router:Router //this router module comes from @angular/router please note that 
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        // console.log(data); // This is for verification purposes only
        this.quiz = data;
      },
      (error) => {
        alert('Error in loading quiz data');
      }
    );
  }

  startQuiz(){
    Swal.fire({
      title: "Do you want to start the quiz?",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Start",
      cancelButtonText: `Not-now`,
      icon:'question'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/'+this.qid])
      } else if (result.isDenied) {
        Swal.fire("Quiz not started", "", "info");
      }
    });
  }
}

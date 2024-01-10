import { LocationStrategy } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  qid: any;
  questions: any;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;

  timer: any;
  formattedTime: string = '';

  private tabSwitchWarningCount = 0;
  private fullScreenWarningCount = 0;

  constructor(
    private location: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.disableRefreshButton();
    this.disableTabSwitch();
    this.enableFullScreen();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestions();
    this.disableInspectElement();
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.location.onPopState(() => history.pushState(null, '', location.href));
  }

  disableRefreshButton() {
    // Disable the refresh button by listening to the 'beforeunload' event
    window.addEventListener('beforeunload', (event) => {
      // You can customize the confirmation message if needed
      const confirmationMessage =
        'Are you sure you want to leave? Your progress will be lost.';
      (event as any).returnValue = confirmationMessage;
      return confirmationMessage;
    });
  }

  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: Event): void {
    // Prevent right-clicking on the page
    event.preventDefault();
  }

  disableTabSwitch() {
    let lastFocusTime = Date.now();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const currentTime = Date.now();
        const timeDifference = currentTime - lastFocusTime;

        if (timeDifference < 5000) {
          // Less than 5 seconds between focus changes (tab switch)
          this.evalQuiz();
        } else {
          // Show a warning
          Swal.fire(
            'Warning',
            'Switching tabs is not allowed. Please stay on this page.',
            'warning'
          );
        }

        lastFocusTime = currentTime;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Also listen for focus events on the window
    window.addEventListener('focus', () => {
      lastFocusTime = Date.now();
    });

    // Optional: Warn the user if they try to close the tab or the window
    window.addEventListener('beforeunload', (event) => {
      event.returnValue =
        'Are you sure you want to leave? Your progress will be lost.';
    });
  }

  enableFullScreen() {
    // Open the window in full screen mode
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }

    // Listen for full screen changes
    document.addEventListener('fullscreenchange', () =>
      this.handleFullScreenChange()
    );
    document.addEventListener('webkitfullscreenchange', () =>
      this.handleFullScreenChange()
    );
  }

  disableInspectElement() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'F12' || (event.ctrlKey && event.key === 'U')) {
        event.preventDefault();
        Swal.fire('Warning', 'Inspect Element is not allowed.', 'warning');
      }
    });
  }

  handleFullScreenChange() {
    // Detect full screen changes
    if (
      !document.fullscreenElement &&
      !document.fullscreenElement &&
      !document.fullscreenElement &&
      !document.fullscreenElement
    ) {
      // Full screen mode disabled
      this.fullScreenWarningCount++;
  
      if (this.fullScreenWarningCount >= 2) {
        // Submit the form after two warnings
        this.evalQuiz();
      } else {
        // Show a warning
        Swal.fire(
          'Warning',
          'Disabling full screen is not allowed. Please stay on this page.',
          'warning'
        );
      }
    } else {
      // Full screen mode enabled
      // Re-enter full screen mode
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    }
  }
  

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data) => {
        this.questions = data;
        // console.log(data);

        this.timer = this.questions.length * 4 * 60;
        // console.log(this.timer);
        this.questions.forEach((q: any) => {
          q['givenAnswer'] = '';
        });

        this.startTimer();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    );
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  print() {
    window.print();
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.submitQuiz();
        clearInterval(t);
      } else {
        this.timer--;
        this.formattedTime = this.getFormattedTime();
      }
    }, 1000);
  }

  getFormattedTime() {
    let hh = Math.floor(this.timer / 3600);
    let mm = Math.floor((this.timer % 3600) / 60);
    let ss = this.timer % 60;

    let formattedHH = hh < 10 ? `0${hh}` : `${hh}`;
    let formattedMM = mm < 10 ? `0${mm}` : `${mm}`;
    let formattedSS = ss < 10 ? `0${ss}` : `${ss}`;

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
  }

  evalQuiz() {
    this.isSubmit = true;
    this.questions.forEach((q: { givenAnswer: string; answer: string }) => {
      if (q.givenAnswer == q.answer) {
        this.correctAnswers++;
        let marksSingle =
          this.questions[0].quiz.maxMarks / this.questions.length;
        this.marksGot += marksSingle;
      }
      if (q.givenAnswer.trim() != '') {
        this.attempted++;
      }
    });
  }
}

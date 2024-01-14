import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    confirmPassword: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    if (this.isFormInvalid()) {
      this.showSweetAlert('Data is not valid.', 'error');
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        this.showSweetAlert('User registration Successful', 'success');
      },
      (error) => {
        console.log(error);
        this.showSweetAlert('Something went wrong!', 'error');
      }
    );
  }

  confirmPasswordInput: any;
  matcher = new MyErrorStateMatcher();

  onConfirmPasswordInput(confirmPasswordInput: any): void {
    this.confirmPasswordInput = confirmPasswordInput;
  }

  // Function to check if the form is invalid
  private isFormInvalid(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format

    return (
      !this.user.username ||
      !this.user.email || !emailRegex.test(this.user.email) ||
      !this.user.firstName ||
      !this.user.lastName ||
      !this.user.phone || !phoneRegex.test(this.user.phone) ||
      !this.user.password ||
      !this.user.confirmPassword ||
      this.user.password !== this.user.confirmPassword
    );
  }

  // Function to show SweetAlert messages
  private showSweetAlert(message: string, type: 'success' | 'error' | 'warning' | 'info' | 'question') {
    Swal.fire({
      title: message,
      icon: type,
      timer: 3000,
      showConfirmButton: false,
    });
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control:any, form:any): boolean {
    return control && control.invalid && (control.dirty || control.touched);
  }
}

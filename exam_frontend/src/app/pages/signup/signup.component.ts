import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private snak: MatSnackBar) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (
      this.user.username == '' ||
      this.user.username == null ||
      this.user.email == '' ||
      this.user.email == null ||
      this.user.firstName == '' ||
      this.user.firstName == null ||
      this.user.lastName == '' ||
      this.user.lastName == null ||
      this.user.phone == '' ||
      this.user.phone == null ||
      this.user.password == '' ||
      this.user.password == null
    ) {
      this.snak.open('Data is not valid. ', 'Ok', {
        duration: 3000,
      });
      return;
    }

    //add user: userservice
    this.userService.addUser(this.user).subscribe(
      (data) => {
        //success
        console.log(data);
        this.snak.open('User registration Successful', 'Ok', {
          duration: 3000,
        });
      },
      (error) => {
        //error
        console.log(error);
        // alert("something went wrong");
        this.snak.open('Something went wrong!', 'Ok', {
          duration: 2000,
        });

        // Swal.fire("Something Went Wrong")
      }
    );
  }
}

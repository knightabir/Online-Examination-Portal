import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  constructor(private snak: MatSnackBar, private login: LoginService) {}

  ngOnInit(): void {}

  formSubmit() {

    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snak.open('Username is required !!', 'OK', {
        duration: 3000,
      });
      return;
    } else if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snak.open('Password is required !!', 'OK', {
        duration: 3000,
      });
      return;
    }

    //requrest to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('sucess');
        console.log(data);

        //login..
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);
          //redirect....... ADMIN => Admin Dashboard NORMAL => Normal Dashboard
          if (this.login.getUserRole() == 'ADMIN') {
            //admin dashboard
            window.location.href = '/admin';
          } else if (this.login.getUserRole() == 'NORMAL') {
            //normal user dashboard
            window.location.href = '/dashboard/0';
          } else {
            this.login.logout();
            location.reload();
          }
        });
      },
      (error) => {
        console.log('error');
        console.log(error);
        this.snak.open('User Id or Password Invalid | Try Again', '', {
          duration: 3000,
        });
      }
    );
  }
}

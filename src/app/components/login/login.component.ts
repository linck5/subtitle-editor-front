import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { AuthService } from '../../shared/auth.service';
import {NgForm} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  error: string = "";
  ok: Boolean = true;
  submitting: Boolean = false;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.submitting = true;

    this.authService.login(form.value.username, form.value.password)
      .pipe( finalize( ()=>{ this.submitting = false; } ))
      .subscribe(
        (data: any) => {
          this.error = "";
        },
        (err: HttpErrorResponse) => {
          if(err.error.code == 'authDenied'){
            this.error = "Incorrect username or password."
          }
        }
      );
  }
}

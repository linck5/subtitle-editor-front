import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { AuthService } from '../../shared/auth.service';
import {NgForm} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  error: string = "";
  ok: Boolean = true;
  submitting: Boolean = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(form: NgForm) {
    this.submitting = true;

    this.authService.login(form.value.username, form.value.password)
      .pipe( finalize( ()=>{ this.submitting = false; } ))
      .subscribe(
        (data: any) => { //login successful
          this.error = "";
          this.router.navigateByUrl(this.returnUrl);
        },
        (err: HttpErrorResponse) => {
          if(err.status == 403){
            this.error = "Incorrect username or password."
          }
        }
      );
  }
}

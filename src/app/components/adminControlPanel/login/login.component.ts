import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { AuthService } from '../../../shared/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  ok: Boolean = false;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    console.log(form.valid)

    const payload = {
      username: form.value.username,
      password: form.value.password
    };
    this.apiService.post('auth/authenticate', payload)
      .subscribe((data: any) => {
        this.authService.setToken(data.token);
      });
  }

}

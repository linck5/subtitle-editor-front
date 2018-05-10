import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/api.service';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component implements OnInit {

  stuff: String;

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.stuff = 'hey!';
  }

  ngOnInit() {
    this.authService.deleteToken();

    if (!this.authService.isTokenSet()) {

      const payload = {
        username: "admin",
        password: "admin"
      };
      this.apiService.post('auth/authenticate', payload)
        .subscribe((data: any) => {
          this.authService.setToken(data.token);

          this.apiService.get('message')
          .subscribe(data => {
            console.log("response from message service > " + JSON.stringify(data));
            this.stuff = data[0].message;
          });
        });


    }




  }

}

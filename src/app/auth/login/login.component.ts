import { Component } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { LOGIN } from 'src/app/graphql/graphql.mutation';
import { AuthService } from 'src/app/services/auth.service';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm = this.fb.group({
    email:[,[Validators.required, Validators.email]],
    password:[,[Validators.required,Validators.min(8)]]
  })

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ){}

  login(){

    if (this.loginForm.invalid) return;
        
    this.authService.login(this.loginForm.value).subscribe({
      complete: () => this.router.navigateByUrl('/main'),
      error: (err) => {
        alert(err);
      }
    });

    
  }

}

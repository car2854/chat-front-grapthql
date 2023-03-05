import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public registerForm = this.fb.group({
    name: [,Validators.required],
    email: [,[Validators.required, Validators.email]],
    password: [,[Validators.required, Validators.min(8)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}

  register(){

    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value)
      .subscribe({
        complete: () => this.router.navigateByUrl('/main'),
        error: (err) => console.log(err)
      });

  }

}

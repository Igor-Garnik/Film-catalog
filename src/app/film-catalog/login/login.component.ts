import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Request } from '../../shared/models/request';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  formErrors = {
    "login": "",
    "password": "",
  }

  validationMessages = {
    "login": {
      "required": "The field can not be empty",
      "minlength": "Does not correspond length",
      "maxlength": "Does not correspond length",
      "pattern": "Wrong format"
    }, "password": {
      "required": "The field can not be empty",
      "minlength": "Does not correspond length",
      "maxlength": "Does not correspond length",
      "pattern": "Wrong format"
    }
  }

  subscription: Subscription;

  submit(): void {
    let credentials = this.userForm.value;
    this.authService.logIn(credentials.login, credentials.password)
      .subscribe((res: Response) => {
        this.subscription = this.authService.isLoggedIn()
          .subscribe(res => {
            res ? this.router.navigate(['/main']) : null;
          })
      })
  }

  isLoggedIn() {
    this.authService.isLoggedIn()
      .subscribe(res => {
        res ? this.router.navigate(['/main']) : null;
      })

  }
  ngOnInit() {
    this.isLoggedIn()
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      login: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        //Validators.pattern(/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/)]
      ]
      ], password: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)]
      ]
    });
    this.userForm.valueChanges.subscribe(data => this.onValueChange());
  }

  onValueChange() {
    if (!this.userForm) return;

    for (let item in this.formErrors) {
      this.formErrors[item] = "";
      let control = this.userForm.get(item);

      if (control && control.dirty && !control.valid) {
        let message = this.validationMessages[item];
        for (let key in control.errors) {
          let a = message[key]
          this.formErrors[item] = message[key];
        }
      }
    }
  }

  ngOnDestroy() {
    this.subscription ? this.subscription.unsubscribe() : null;
  }

}

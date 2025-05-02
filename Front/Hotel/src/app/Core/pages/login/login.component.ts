import {AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthServiceService} from '../../service/auth/auth.service';
import {Modal} from 'flowbite';
import {URLService} from '../../service/NavServices/urlservice.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent implements OnInit ,  AfterViewInit , OnDestroy {

  _authService = inject(AuthServiceService);
  _uRLService :URLService = inject(URLService);
  subscription : Subscription = new Subscription();
  LoginFrom !: FormGroup;
  passwordEye: boolean = false;
  rePasswordEye: boolean = false;
  apiCalling: boolean = false;
  @ViewChild("password") password!: ElementRef;
  @ViewChild('RePassword') RePassword!: ElementRef;
  @ViewChild('modal') modalElement!: ElementRef;
  modal!: Modal;



  ngOnInit() {
    this.loginFormInit();
  }

  ngAfterViewInit() {
    this.modal  = new Modal(this.modalElement.nativeElement);
  }

  loginFormInit() {
    this.LoginFrom = new FormGroup({
      name : new FormControl( null , [Validators.required, Validators.minLength(6) , Validators.maxLength(30) ] ),
      email : new FormControl(null , [Validators.required, Validators.email]),
      password: new FormControl(null , [Validators.required, Validators.pattern(/^[A-Z]\w{6,}$/) ]),
      rePassword: new FormControl(null , [Validators.required, Validators.pattern(/^[A-Z]\w{6,}$/) ]),
      phone : new FormControl(null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    } , this.rePasswordValidation );
  }


  rePasswordValidation(form:AbstractControl){
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    return password == rePassword ? null : {misMatch: true};
  }

  loginForm(){

    if(this.LoginFrom.invalid){
      this.LoginFrom.markAllAsTouched();
    }else{
      this.apiCalling = true;
      this.subscription = this._authService.Signup(this.LoginFrom.value).subscribe({
        next: result => {
          this.apiCalling = false;
          this._uRLService.loginNavigation('/auth/register')
        },
        error: error => {
          this.apiCalling = false;
          this.modal.show();
        },
        complete: () => {}
      })
    }
  }

  //Used to togel the type property between password and text
  seePassword(event : MouseEvent | TouchEvent){
    event.preventDefault();
    this.passwordEye = !this.passwordEye;
    this.passwordEye ? this.password.nativeElement.type = 'text' :  this.password.nativeElement.type = 'password';
  }

  //Used to togel the type property between password and text
  seeRePassword(event : MouseEvent | TouchEvent){
    event.preventDefault();
    this.rePasswordEye = !this.rePasswordEye;
    this.rePasswordEye ? this.RePassword.nativeElement.type = 'text' : this.RePassword.nativeElement.type = 'password';
  }

  closeModal(){
    this.modal.hide();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

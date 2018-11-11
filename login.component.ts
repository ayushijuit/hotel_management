import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppService } from "../app.service";
import { CommonService } from "../common.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  addProduct: FormGroup
  login = true;
  submittedLogin = false;
  loginForm: FormGroup
  base64textString:String="";  
  fileName
  cover1
  url
  constructor(
    private http: HttpClient, 
    private router: Router, 
    private appService: AppService, 
    private commonService: CommonService) { 
      // document.getElementById('id01').style.display='none'
      
    }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonService.emailRegex)
      ]),
      password: new FormControl('', [
        Validators.required,
        // Validators.pattern(this.commonService.passwordRegex)
      ])
    })
    // setTimeout(()=>{document.getElementById('id01').style.display='none'},2000)
    
  }

  signUp() {
    this.router.navigate(['/signup'])
  };
  
  onLogin() {
    if (this.loginForm.valid) {
      var contorl = this.loginForm.controls
    document.getElementById('loading-bar-spinner').style.display='block'
      var form = {
        "email": contorl.email.value,
        "password": contorl.password.value
      }
      
      this.appService.login(form).subscribe((data) => {
        var userInfo = JSON.parse(data);
        if (userInfo.login == 'Owner LoggedIn') {
                  
            document.getElementById('loading-bar-spinner').style.display='none'

          this.router.navigate(['hotelDashBoard'])
          localStorage.setItem('token', JSON.stringify({ token: userInfo.token }))
        } else if (userInfo.message == false) {
          alert("Email is not Registered")
        } else if (userInfo.login == 'Staff LoggedIn') {
        
           document.getElementById('loading-bar-spinner').style.display='none'
            
          this.router.navigate(['staffDashBoard'])
          localStorage.setItem('token', JSON.stringify({ token: userInfo.token }))
        }else if(userInfo.wpassword == 'Wrong Password'){
            alert('Password is not correct')
        }else{
          alert('Server Error');
        }
      })
    };
  };
  
};

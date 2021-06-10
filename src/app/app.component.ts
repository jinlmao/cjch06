import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usersForm: FormGroup;

  userName: FormControl;
  passWord: FormControl;

  baseUrl = "http://127.0.0.1:8080/";

  page1 = false;
  page2 = true;

  isinvalid: boolean;
  isnoinvalid: boolean;

  name$!: Observable<String>;

  constructor(f: FormBuilder, private httpClient: HttpClient) {
    this.usersForm = f.group({
      'userName': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])]
    }
    )
    this.userName = <FormControl>this.usersForm.controls['userName'];
    this.passWord = <FormControl>this.usersForm.controls['passWord'];

    this.isinvalid = this.usersForm.controls['userName'].invalid;
    this.isnoinvalid = this.usersForm.controls['userName'].valid;

  }

  onSubmit(form: any): void {
    console.log("递交的值", form);
    this.httpClient.post(this.baseUrl + 'login', form).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('登录成功');
          this.page1 = true;
          this.page2 = false;
        } else {
          alert('用户名或者密码错误！');
        }
      }
    )
  }

}

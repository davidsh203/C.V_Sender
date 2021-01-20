import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from "@angular/common/http";
import { Message } from "./modules/message"
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  default_message: string = "This is default message";
  mainForm: FormGroup;
  messageArray: Message[] = [];
  showIcon:boolean = false;


  sendForm(): void {
    if (this.mainForm.invalid) {
      alert('Form unknown error');
      return;
    }
    this.showIcon=true;
    console.log('sendForm function start ');
    this.http.post<any>("http://localhost:3000/sendmail", {
      ng_email: this.mainForm.get('email').value,
      ng_message: this.mainForm.get('message').value
    }).subscribe(
      res => {
        if (res == '1') {
          this.showIcon=false;
          alert('email sent');
          let m: Message = { email: "", message: "" };
          m.email = this.mainForm.get('email').value;
          m.message = this.mainForm.get('message').value
          this.messageArray.push(m);
          this.mainForm.controls['email'].setValue('');
          console.log(this.messageArray);

        } else {
          alert('Server unknown error');
        }
      },
      err => console.log(err)
    );
  }



  ngOnInit(): void {
    this.mainForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
        + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]],
        message: [this.default_message, Validators.required]
      })
  }
}
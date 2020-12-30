import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  constructor(private http:HttpClient) { }

  
  default_message: string = "This is default message";
  mainForm: FormGroup;

  sendForm(): void {   
    console.log('sendForm function start ');
    
    this.http.post<any>("http://localhost:3000/sendmail",{
      ng_email:this.mainForm.get('email').value,
      ng_message:this.mainForm.get('message').value
    }).subscribe();
    console.log('sendForm function end ');
  }

  

  ngOnInit(): void {
    this.mainForm = new FormGroup({
      email: new FormControl('ssa@dasa.com', [Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
        + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]),
      message: new FormControl(this.default_message, Validators.required)
    })
  }



}

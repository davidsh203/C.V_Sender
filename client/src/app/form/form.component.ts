import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  default_message:string = "This is default message";
  
  send(a:string,b:any):void{
    alert(a + ' ' + b.value);
    console.log(b);
    
  }

  constructor() { }

  ngOnInit(): void {
  }

  

}

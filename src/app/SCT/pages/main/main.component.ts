import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
    `
    .main{
      margin-left: 15%;
      max-width: 85%;
      max-height: 87%;
      width: 100%;
      height: 100%;
    }
    `
  ]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
    <h1>
      pages works!
    </h1>
  `,
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('hayyy');
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'layout',
  template: `
  <div class='layout'>
    <main-navbar></main-navbar>
      {{title}}
    <router-outlet></router-outlet>   
    <player></player>
  </div>
  `,
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent {}

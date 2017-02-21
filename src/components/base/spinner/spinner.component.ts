import { Component, Input } from '@angular/core'

@Component({
  selector: 'spinner',
  template: `
    <div [ngClass]='{"spinner": main}'>
      <div class="load-9">
          <div class="spinner">
              <div class="bubble-1"></div>
              <div class="bubble-2"></div>
          </div>
      </div>
    </div>
  `,
  styleUrls:['./spinner.component.css']
})
export class SpinnerComponent {
  @Input() main: boolean = true;
}

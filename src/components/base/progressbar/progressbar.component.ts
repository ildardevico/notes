import { Component, Input, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'progressbar',
  template:`
  <div #progresselement class='pr-container'>
    <ngb-progressbar
      class='progressbar-element'
      type="danger"
      [striped]="true"
      [value]="value"
      [animated]="true"
      ></ngb-progressbar>
   </div>
  `,
  styles: [`
    .pr-container {
      cursor: pointer;
    }`
  ]
})
export class ProgressbarBasic {
  @Input() value: number;
  @Input() updateValueHandler: Function;

  @ViewChild('progresselement')
    progressElement: ElementRef;

  progressDrag: boolean = false;

  @HostListener('mousedown', ['$event'])
    onMousedown(e): void {
      this.progressDrag = true;
      this.updateValue(e);
    }

  @HostListener('mouseup', ['$event'])
    onMouseup(e): void {
      if(this.progressDrag) {
        this.progressDrag = false;
        this.updateValue(e);
      }
    }

  @HostListener('mousemove', ['$event'])
    onMousemove(e): void {
      if(this.progressDrag) {
        this.updateValue(e);
      }
    }

  updateValue = (e): void => {
    const { clientWidth } = this.progressElement.nativeElement
    const { pageX, target: { offsetLeft } } = e;
    const coordinateX = pageX - offsetLeft;
    const value = (coordinateX / clientWidth) * 100;
    this.updateValueHandler(Math.round(value));
  }
}

import { Component, Input, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'volume-range',
  template:`
  <div class='volumerange'>
    <input #volumerange min="0" max="1" step='0.1' [value]="value" type="range"/>
    <i (click)='mute($event)' class="material-icons">{{!muted ? 'volume_up': 'volume_off'}}</i>
  </div>
  `,
  styleUrls: ['./volumerange.component.css']
})
export class VolumeRangeComponent {
  @Input() value: number;
  @Input() updateValueHandler: Function;
  @Input() mute: Function;
  @Input() muted: boolean;

  volumeDrag: boolean = false;

  @ViewChild('volumerange')
    volumeElement: ElementRef;

  @HostListener('mousedown', ['$event'])
    onMousedown(e): void {
      this.volumeDrag = true;
      this.updateValue(e);
    }

  @HostListener('mouseup', ['$event'])
    onMouseup(e): void {
      if(this.volumeDrag) {
        this.volumeDrag = false;
        this.updateValue(e);
      }
    }

  @HostListener('mousemove', ['$event'])
    onMousemove(e): void {
      if(this.volumeDrag) {
        this.updateValue(e);
      }
    }

  updateValue = (e): void => {
    this.updateValueHandler(e.target.value);
  }
}

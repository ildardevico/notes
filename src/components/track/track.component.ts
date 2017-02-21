import { Component, Input } from '@angular/core';
import { Track } from '../../models'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'track-view',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent {
  constructor(private sanitizer: DomSanitizer) {}
  @Input() track: Track;
  @Input() currentTrack: Track;
  @Input() play: boolean;
  getImageUri = ({ avatar_url }) =>  this.sanitizer.bypassSecurityTrustStyle((`url(${avatar_url})`))
}

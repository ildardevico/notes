import { Component, OnInit } from '@angular/core'
import { Track } from '../../models'
import { PlayerService } from '../../services/player.service'
import { DomSanitizer } from '@angular/platform-browser'
import { Observable } from 'rxjs';


@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  currentTrack: Track;
  play: boolean;
  time: string;
  constructor(private playerService: PlayerService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.playerService.currentState.subscribe(({ play, currentTrack }) => {
      this.currentTrack = currentTrack
      this.play = play
    })
    this.playerService.time.subscribe(time => this.time = `${time}%`)
  }

  getImageUri = ({ avatar_url }) =>  this.sanitizer.bypassSecurityTrustStyle((`url(${avatar_url})`))

}

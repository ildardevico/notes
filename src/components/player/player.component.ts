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
  nextBlocked: boolean = false;
  previousBlocked: boolean = false;

  constructor(private playerService: PlayerService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const { currentState, time, playState } = this.playerService
    currentState.subscribe(({ currentTrack, previousBlocked, nextBlocked }) => {
       this.currentTrack = currentTrack
       this.previousBlocked = previousBlocked
       this.nextBlocked = nextBlocked
    })
    time.subscribe(time => this.time = `${time}%`)
    playState.subscribe(play => this.play = play)
  }

  next() {
    this.playerService.next()
  }

  previous() {
    this.playerService.previous()
  }

  stop() {
    this.playerService.stop()
  }

  playTrack() {
    this.playerService.player.play()
  }

  getImageUri = ({ avatar_url }) =>  this.sanitizer.bypassSecurityTrustStyle((`url(${avatar_url})`))

}

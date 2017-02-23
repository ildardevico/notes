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
  time: number;
  volume: number = 1;
  nextBlocked: boolean = false;
  previousBlocked: boolean = false;
  muted: boolean = false;

  constructor(private playerService: PlayerService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const { currentState, time, playState, volume } = this.playerService
    currentState.subscribe(({ currentTrack, previousBlocked, nextBlocked }) => {
       this.currentTrack = currentTrack
       this.previousBlocked = previousBlocked
       this.nextBlocked = nextBlocked
    })
    time.subscribe(time => this.time = time)
    playState.subscribe(play => this.play = play)
    volume.subscribe(volume => this.volume = volume)
  }

  next(): void {
    this.playerService.next()
  }

  previous(): void {
    this.playerService.previous()
  }

  stop(): void {
    this.playerService.stop()
  }

  playTrack(): void {
    this.playerService.player.play()
  }

  updateTime = (width): void =>  {
    const { duration } = this.playerService.player
    this.playerService.player.currentTime = (width/100) * duration
  }

  updateVolume = (volume): void => {
    if(volume && (+volume)) {
      this.playerService.player.volume = volume
      if(this.muted) {
        this.muted = false
      }
    } else if(!(+volume)) {
      this.muted = true
    }
  }

  mutePlayer = (e): void => {
    e.preventDefault()
    if(!this.playerService.player.muted) {
      this.playerService.player.muted = true
      this.muted = true
    } else {
      this.playerService.player.muted = false
      this.muted = false
    }
  }

  getImageUri = ({ avatar_url }) =>  this.sanitizer.bypassSecurityTrustStyle((`url(${avatar_url})`))

}

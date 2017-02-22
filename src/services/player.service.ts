import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import config from '../config'

const getTrackSrc = ({ stream_url }) => `${stream_url}?client_id=${config.client_id}`
const getProgress = player => () => (player.currentTime/player.duration) * 100
const getPlayerState = player => () => !player.paused

@Injectable()
export class PlayerService {

  player = new Audio();

  currentState = new BehaviorSubject({
    playlist: null,
    currentTrack: null,
    trackIndex: -1,
    previousBlocked: false,
    nextBlocked: false,
  })

  playState: Observable<any> = Observable.merge(
    Observable
    .fromEvent(this.player, 'pause')
    .map(getPlayerState(this.player)),
    Observable
    .fromEvent(this.player, 'play')
    .map(getPlayerState(this.player))
  )

  time: Observable<any> = Observable.merge(
    Observable
    .fromEvent(this.player, 'timeupdate')
    .map(getProgress(this.player)),
    Observable
    .fromEvent(this.player, 'seeked')
    .map(getProgress(this.player))
  );

  constructor() {
    this.currentState.subscribe(({ currentTrack }) => {
      if(currentTrack) {
        this.player.src = getTrackSrc(currentTrack);
        this.player.load();
        this.player.play();
      }
    })
    Observable.fromEvent(this.player, 'ended').subscribe(this.next);
  }

  play(newTrack, playlist, trackIndex): void {
    const { currentTrack } = this.currentState.getValue();
    if(this.player.paused && currentTrack && currentTrack.id === newTrack.id) {
      this.player.play()
    } else {
      this.currentState.next({
        playlist,
        currentTrack: newTrack,
        trackIndex,
        previousBlocked: !playlist[trackIndex - 1],
        nextBlocked: !playlist[trackIndex + 1],
      });
    }
  }

  stop(): void {
    this.player.pause()
  }

  next = () => {
    const { currentTrack, playlist, trackIndex } = this.currentState.getValue();
    if(playlist) {
      const newIndex = trackIndex + 1;
      this.currentState.next({
        playlist,
        currentTrack: playlist[newIndex],
        trackIndex: newIndex,
        previousBlocked: !playlist[newIndex - 1],
        nextBlocked: !playlist[newIndex + 1],
      });
    }
  }

  previous(): void {
    const { currentTrack, playlist, trackIndex } = this.currentState.getValue();
    if(playlist) {
      const newIndex = trackIndex - 1;
      this.currentState.next({
        playlist,
        currentTrack: playlist[newIndex],
        trackIndex: newIndex,
        previousBlocked: !playlist[newIndex - 1],
        nextBlocked: !playlist[newIndex + 1],
      });
    }
  }
}

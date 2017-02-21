import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import config from '../config'

const getTrackSrc = ({ stream_url }) => `${stream_url}?client_id=${config.client_id}`
const getProgress = player => () => (player.currentTime/player.duration) * 100

@Injectable()
export class PlayerService {
  player = new Audio();

  currentState = new BehaviorSubject({
    playlist: null,
    currentTrack: null,
    play: false,
    trackIndex: -1,
  })

  timeupdate: Observable<any> = Observable
  .fromEvent(this.player, 'timeupdate')
  .map(getProgress(this.player));

  seeked: Observable<any> = Observable
  .fromEvent(this.player, 'seeked')
  .map(getProgress(this.player));

  time: Observable<any> = Observable.merge(this.timeupdate, this.seeked);

  constructor() {
    this.currentState.subscribe(({ currentTrack, play }) => {
      if(!play) {
        this.player.pause();
      } else {
        this.player.src = getTrackSrc(currentTrack);
        this.player.load();
        this.player.play();
      }
    })
    Observable.fromEvent(this.player, 'ended').subscribe(this.next)

  }

  play(currentTrack, playlist, trackIndex): void {
    this.currentState.next({
      playlist,
      currentTrack,
      play: true,
      trackIndex,
    });
  }

  stop(): void {
    const { playlist, currentTrack, trackIndex } = this.currentState.getValue();
    this.currentState.next({
      playlist,
      currentTrack,
      play: false,
      trackIndex,
    });
  }

  next = () => {
    const { currentTrack, playlist, trackIndex } = this.currentState.getValue();
    if(playlist) {
      const newIndex = trackIndex + 1;
      this.currentState.next({
        playlist,
        currentTrack: playlist[newIndex],
        trackIndex: newIndex,
        play: true
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
        play: true
      });
    }
  }
}

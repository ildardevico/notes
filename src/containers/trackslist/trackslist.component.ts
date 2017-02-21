import { Component, OnInit } from '@angular/core'
import { TracksService } from '../../services/tracks.service'
import { PlayerService } from '../../services/player.service'
import { Track } from '../../models'
import { Observable } from 'rxjs';

const checkIfScrollBottom = ({ scrollTop, scrollHeight, offsetHeight }) => scrollTop == (scrollHeight - offsetHeight)

@Component({
  selector: 'track-list',
  templateUrl: './trackslist.component.html',
  styleUrls: ['./trackslist.component.css']
})
export class TrackListComponent implements OnInit {

  tracks = [];
  loaded: boolean = false;
  play: boolean = false;
  currentTrack : Track;

  constructor(private tracksService: TracksService, private playerService: PlayerService) {}

  checkLoadMore = (e): void => {
    checkIfScrollBottom(e.target) && this.loadMore()
  }

  loadMore(): void {
    this.tracksService.loadMoreTracks()
  }

  ngOnInit(): void {
    this.tracksService.tracks.subscribe(data => this.tracks = data)
    this.tracksService.tracksLoaded.subscribe(loaded => this.loaded = loaded)
    this.playerService.currentState.subscribe(({  currentTrack }) => {
      this.currentTrack = currentTrack
    })
    this.playerService.playState.subscribe(play => this.play = play)
    Observable
    .fromEvent(document.querySelector('.tracks-container'), 'scroll')
    .subscribe(this.checkLoadMore)
  }

  playTrack(trackIndex): void {
    if(this.play && this.currentTrack.id === this.tracks[trackIndex].id) {
      this.playerService.stop();
    } else {
      this.playerService.play(this.tracks[trackIndex], this.tracks, trackIndex);
    }
  }

  playNext(): void {
    this.playerService.next()
  }

  playPrevious(): void {
    this.playerService.previous()
  }
}

import { Injectable } from "@angular/core";
import { URLSearchParams, Http } from '@angular/http';
import { HttpService } from "./http.service";
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import { Track, Options } from '../models';
import config from '../config';

const defaultOptions: Options = { tag: null, limit: 100, offset: 0, merge : false };

@Injectable()
export class TracksService {

  private tracksUrl: string = `tracks`;
  tracks: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>([]);
  options: BehaviorSubject<Options> = new BehaviorSubject<Options>(defaultOptions);
  tracksLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpService) {
    this.options.subscribe(this.getTracks);
  }

  private setOptions(options: Options): void {
    this.options.next(options);
  }

  private getTracks = (options: Options): void => {
    this.tracksLoaded.next(false);
    const { tag, offset, limit, merge } = options;
    const previousTracks = this.tracks.getValue();
    const params = new URLSearchParams();
    if(tag) params.set('genres', tag);
    params.set('offset', `${offset}`);
    params.set('limit', `${limit}`);
    this.http
      .get(this.tracksUrl, { search: params })
      .map(response => response.json())
      .delay(300)
      .subscribe(data => {
        this.tracks.next( merge ? [ ...previousTracks, ...data ]: data );
        this.tracksLoaded.next(true);
      });
  }

  loadMoreTracks = (): void => {
    const { tag, offset, limit } = this.options.getValue();
    this.setOptions({ tag, offset: offset + limit, limit, merge: true });
  }

  getTracksByTag = (tag): void => {
    const { limit, offset } = this.options.getValue();
    this.setOptions({ limit, offset, tag, merge: false });
  }

}

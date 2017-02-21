import { Component } from '@angular/core'
import { TracksService } from '../../services/tracks.service'
import { GENRES } from '../../constants'
import { Tag } from '../../models'

@Component({
  selector: 'main-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private tracksService: TracksService) {}

  currentOption: Tag = GENRES[0];

  getByTag = (tag): void => {
    this.tracksService.getTracksByTag(tag.value)
  }

  tags: Array<Tag> = GENRES;
}

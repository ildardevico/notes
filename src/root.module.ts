import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend, Http} from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TracksService } from './services/tracks.service';
import { HttpService, provideFactory } from './services/http.service';
import { UsersService } from './services/user.service'
import { PlayerService } from './services/player.service'

import { LayoutComponent } from './containers/layout/layout.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { RoutingModule } from './containers/routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TrackListComponent } from './containers/trackslist/trackslist.component';
import { TrackComponent } from './components/track/track.component';
import { SpinnerComponent } from './components/base/spinner/spinner.component';
import { DropdownComponent } from './components/base/dropdown/dropdown.component';
import { PlayerComponent } from './components/player/player.component'
import { ProgressbarBasic  } from './components/base/progressbar/progressbar.component'

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    NavbarComponent,
    TrackListComponent,
    TrackComponent,
    SpinnerComponent,
    DropdownComponent,
    PlayerComponent,
    ProgressbarBasic,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    NgbModule.forRoot(),
  ],
  providers: [
    TracksService,
    UsersService,
    PlayerService,
    {
      provide: HttpService,
      useFactory: provideFactory,
      deps: [ XHRBackend, RequestOptions ]
    }
  ],
  bootstrap: [ LayoutComponent ]
})
export class RootModule {}

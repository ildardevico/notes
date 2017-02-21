import { Injectable } from "@angular/core";
import { URLSearchParams, Http } from '@angular/http';
import { HttpService } from "./http.service";
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import config from '../config';

@Injectable()
export class UsersService {
  constructor() {}
}

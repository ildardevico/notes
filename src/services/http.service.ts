import {Injectable} from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import config from '../config'

@Injectable()
export class HttpService extends Http {

  constructor (backend: XHRBackend, options: RequestOptions) {
    super(backend, options);
  }

  request(request: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if(request instanceof Request) {
      const { endpoint, postFix } = config
      request.url = `${endpoint}${request.url}${!(~request.url.indexOf('?')) ? `?${config.postFix}`: `&${config.postFix}`}`;
    }
    return super.request(request, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: HttpService) {
    return (res: Response) => {
      console.log(res)
      throw res
    }
  }
}

export function provideFactory(backend: XHRBackend, options: RequestOptions) {
  return new HttpService(backend, options);
}

import { Http, Headers, RequestOptions } from '@angular/http';
// import { LocalStorageService, LoginModel } from '../storages/index'

export class BaseRequest<T> {
  public json_parrams: T;
  public request_options: RequestOptions;
  // public localStorageService:LocalStorageService;
  constructor() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // this.localStorageService = new LocalStorageService();
    // var model = this.localStorageService.getLoginModel();
    /*
    if(model)
    {
            headers.append('X-Key', model.key);
    }
    */
    this.request_options = new RequestOptions({ headers: headers });
  }
}
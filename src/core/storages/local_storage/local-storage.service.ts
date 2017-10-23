import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  // TODO: Need to handle QUOTA_EXCEEDED_ERR
  constructor() {

  }

  public read(path: string): any {
    // if not in local storage, the string 'undefined' is returned (why???)
    let text = localStorage.getItem(path);
    if (text === null || typeof text === 'undefined' || text === 'undefined') {
      console.log('LocalStorageService::read(' + path + ') - path not found, returned null');
      return null;
    } else {
      console.log('LocalStorageService::read(' + path + ')');
      return text;
    }
  }

  readObject<T>(path): T {
    let text: any = this.read(path);
    let data: T;
    try {
      data = <T>JSON.parse(text);
    } catch (error) {
      console.log('LocalStorageService::readObject: cant convert string from local storage to object using JSON.parse(). Error:' + error);
      data = null;
    }

    return data;
  }

  public write(path: string, text: string): void {
    console.log('LocalStorageService::write(' + path + ')');
    localStorage.setItem(path, text);
  }

  writeObject(path: string, data: any): void {
    let text;
    if (typeof data !== 'string') {
      text = JSON.stringify(data);
    } else {
      text = data;
    }
    this.write(path, text);
  }

  remove(path: string): void {
    console.log('LocalStorageService::remove(' + path + ')');
    localStorage.removeItem(path);
  }

  clear(): void {
    console.log('LocalStorageService::clear - all items removed from local storage');
    localStorage.clear();
  }
}

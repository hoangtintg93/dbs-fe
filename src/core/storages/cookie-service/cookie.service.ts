import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {
  public setCookie(cname, cvalue, hour) {
    var curCookie = { 'expired': null }, d = new Date();
    d.setTime(d.getTime() + (hour * 60 * 60 * 1000));

    switch (cname) {
      case 'userinfo':
        if (Boolean(this.getCookie('userinfo'))) {
          try {
            curCookie = JSON.parse(this.getCookie('userinfo'));
          } catch (err) {
            console.log(err.message);
          }
        }

        if (!Boolean(curCookie['expired'])) {
          cvalue['expired'] = d.toUTCString();
        } else {
          cvalue['expired'] = curCookie['expired'];
        }

        break;
      default:
        cvalue['expired'] = d.toUTCString();
        break;
    }
    document.cookie = cname + '=' + encodeURIComponent(JSON.stringify(cvalue)) + ';' + 'expires=' + cvalue['expired'] + ';path=/';
  }

  public setCookieDefault(cname, cvalue) {
    this.setCookie(cname, cvalue, 24);
  }

  public getCookie(cname) {
    var c = document.cookie.split(';'), output, cl = c.length;
    for (var i = 0; i < cl; ++i) {
      var arr_c = c[i].trim().split('=');
      if (arr_c[0] === cname) {
        output = decodeURIComponent(arr_c[1]);
        break;
      }
    }
    return output;
  }

  public checkCookie(arr_cn) {
    var arr_cn_l = arr_cn.length;
    if (!arr_cn_l) {
      return false;
    }

    var is_exist = true;
    for (var i = 0; i < arr_cn_l; ++i) {
      if (!this.getCookie(arr_cn[i])) {
        is_exist = false;
        break;
      }
    }
    return is_exist;
  }

  public destroyCookie(cname) {
    document.cookie = cname + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = cname + '=; path=/v2;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}

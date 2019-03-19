import { Injectable } from "@angular/core";

@Injectable()
export class UtilsService {
  constructor() {}

  detectLinksInsideText(text: string): string {
    const re = /(https?:\/\/[^\s]+)/g;
    return text.replace(re, url => {
      return `<a target="_blank" rel="noopener noreferrer" href="${url}">${url}</a>`;
    });
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(text: string): boolean {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return re.test(String(text));
  }

  validateLink(text: string): boolean {
    const re = /(https?:\/\/[^\s]+)/g;
    return re.test(String(text).toLowerCase());
  }

  concatPageArray(arr1: any[], arr2: any[]): any[] {
    const arrayToSearch = [...arr1];

    arr2.forEach(elem => {
      const foundIndex = arrayToSearch.findIndex(v => v.id === elem.id);
      if (foundIndex > -1) {
        arrayToSearch.splice(foundIndex, 1);
      }
    });

    return [...arrayToSearch, ...arr2];
  }
}

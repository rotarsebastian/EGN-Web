import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import linkifyHtml from "linkifyjs/html";

@Pipe({
  name: "linkify"
})
export class LinkifyPipe implements PipeTransform {
  constructor(private _domSanitizer: DomSanitizer) {}

  transform(value: any, args?: any): any {
    return this._domSanitizer.bypassSecurityTrustHtml(this.stylize(value));
  }

  private stylize(text: string): string {
    if (text && text.length > 0) {
      return linkifyHtml(text, {
        target: {
          url: "_blank"
        }
      });
    }

    return text;
  }
}

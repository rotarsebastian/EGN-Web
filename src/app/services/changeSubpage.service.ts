import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ChangeSubpageService {
  // Send event to change the group subpage
  changeGroupSubpageSource = new Subject<number>();

  changeGroupSubpage(index: number) {
    this.changeGroupSubpageSource.next(index);
  }
}

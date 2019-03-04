import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home-page",
  templateUrl: "./homePage.component.html",
  styleUrls: ["./homePage.component.scss"]
})
export class HomePageComponent {
  constructor(private route: ActivatedRoute) {}
}

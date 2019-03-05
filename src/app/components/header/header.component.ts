import { Component } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/users.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  loggedUser: User;

  constructor(private usersService: UsersService) {
    this.loggedUser = usersService.getLoggedInUser();
  }
}

import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";
import { User } from "src/app/models/users.model";

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"]
})
export class MembersComponent {
  members: any;
  subscription: Subscription;
  isWaiting: boolean;
  copyUsers: User[];

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.isWaiting = true;
    this.subscription = this.userService.usersChanged.subscribe(
      (users: User[]) => {
        this.members = users;
        this.copyUsers = users;
        this.isWaiting = false;
      },
      err => {
        this.isWaiting = false;
      }
    );
  }

  getImage(index: number) {
    return this.members[index].imgPath !== "unset"
      ? `url(${this.members[index].imgPath})`
      : `url(./assets/images/standardProfile.svg)`;
  }

  search($event: any) {
    let value = $event.target.value.toUpperCase();

    this.members = this.copyUsers;

    const result = this.members.filter(user =>
      user.name.toUpperCase().includes(value)
    );

    this.members = result;
  }

  navigateTo(id: number) {
    this.router.navigate(["/user", id]);
  }
}

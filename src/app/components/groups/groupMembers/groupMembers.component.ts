import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { ToastrService } from "ngx-toastr";

const BOTTOM_REACHED = 180; // px

@Component({
  selector: "app-group-members",
  templateUrl: "./groupMembers.component.html",
  styleUrls: ["./groupMembers.component.scss"]
})
export class GroupMembersComponent implements OnInit {
  @Input("groupID") groupID: number;

  groupMembers: any[];
  options: any[];
  selectedMember: any;
  nextPage: number;
  bottomReached: boolean;
  isWaiting: boolean;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
}

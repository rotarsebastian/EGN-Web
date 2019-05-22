import { Component, Input, ViewChild, OnInit } from "@angular/core";
import { MatMenuTrigger } from "@angular/material";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-group-settings",
  templateUrl: "./groupSettings.component.html",
  styleUrls: ["./groupSettings.component.scss"]
})
export class GroupSettingsComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @Input("group") group: any;

  privacyItems: string[];
  groupChanges: any;
  uploadFile: File;

  constructor(private toastr: ToastrService) {}

  ngOnInit() {}
}

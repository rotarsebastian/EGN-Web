import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { UtilsService } from "src/app/services/utils.service";
import { User } from "src/app/models/users.model";

@Component({
  selector: "app-change-password",
  templateUrl: "./changePassword.html",
  styleUrls: ["./changePassword.scss"]
})
export class ChangePasswordDialogComponent {
  oldPass: string;
  newPass: string;
  repeatPass: string;
  loggedUser: User;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private toastr: ToastrService,
    private utilsService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.oldPass = "";
    this.newPass = "";
    this.repeatPass = "";
  }

  close(data: any = null): void {
    this.dialogRef.close(data);
  }

  submit(): void {
    if (this.oldPass === this.newPass) {
      this.toastr.error(
        "The old password and the new password should be different"
      );
      return;
    }

    if (this.newPass !== this.repeatPass) {
      this.toastr.error("The new password does not match");
      return;
    }

    if (!this.utilsService.validatePassword(this.newPass)) {
      this.toastr.error("The new password does not match the requirements");
      return;
    }

    this.close({ oldPassword: this.oldPass, newPassword: this.newPass });
  }

  isDisabled(): boolean {
    return (
      !this.oldPass ||
      this.oldPass.trim().length === 0 ||
      !this.newPass ||
      this.newPass.trim().length === 0 ||
      !this.repeatPass ||
      this.repeatPass.trim().length === 0
    );
  }
}

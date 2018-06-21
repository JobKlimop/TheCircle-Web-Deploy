import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../../_models/user.model';
import {AuthService} from '../../../_services/auth.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  user: User;


  constructor(private authService: AuthService,
              public dialogRef: MatDialogRef<AccountDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.user = this.authService.user;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

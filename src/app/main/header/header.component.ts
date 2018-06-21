import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AccountDetailsComponent} from '../account/account-details/account-details.component';
import {Router} from '@angular/router';
import {User} from '../../_models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoLocation = '../../assets/img/logo.png';

  constructor(private authService: AuthService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.closeOnNavigation = true;
    dialogConfig.width = '500px';

    const dialogRef = this.dialog.open(AccountDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
      // Can be used for updating user information
    });
  }

  logout() {
    this.authService.logout();
  }
}

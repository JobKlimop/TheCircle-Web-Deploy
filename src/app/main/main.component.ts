import { Component, OnInit } from '@angular/core';
import { EncryptionService} from '../_services/encryption.service';
import { ChatService } from '../_services/chat.service';
import { Router } from '@angular/router';

// StreamerService uses the User model for their streamer list (since they're mutual).
import { User } from '../_models/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public streamers: User[] = [];
  public viewers = 0;

  constructor(private encryptionService: EncryptionService, private router: Router) { }

  ngOnInit() {
  }
}


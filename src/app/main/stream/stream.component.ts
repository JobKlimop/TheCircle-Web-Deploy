import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../_services/chat.service';
import {Stream} from '../../_models/stream.model';
import {StreamService} from "../../_services/stream.service";


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  @Input() stream: Stream;
  public streamer: string;
  public username: string;
  public slogan: string;
  public avatar: string;
  public viewers: string;
  public viewCount: number;

  constructor(private router: Router, private chatService: ChatService, private streamService: StreamService) {
    // Set some default user information.
    this.avatar = this.avatar;
   }

  ngOnInit() {
    this.chatService.viewersChanged
    .subscribe((newViewers) => {
      this.viewers = newViewers;
    });
    
    this.streamer = this.streamService.getStreamer();

    this.streamService.getStreamInfo(this.streamer)
      .then((response: any) => {
        this.username = response.userinfo.username;
        this.slogan = response.userinfo.slogan;
        this.viewCount = response.viewers;
        console.log('VIEWCOUNT: ' + this.viewCount);
      });
  }
}

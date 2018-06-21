import {Component, Input, OnInit} from '@angular/core';
import {Stream} from '../../../_models/stream.model';
import {Observable} from 'rxjs';
import {User} from '../../../_models/user.model';
import {StreamService} from '../../../_services/stream.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-singlestream',
  templateUrl: './singlestream.component.html',
  styleUrls: ['./singlestream.component.css']
})
export class SinglestreamComponent implements OnInit {
  @Input() stream: any;
  @Input() user: User;
  users: User;
  subscriberArray = [];
  ip = '../../../../assets/img/video.jpg';
  viewerIcon = '../../../../assets/img/viewer-icon.png';
  subscriberCount: number;

  constructor(private router: Router, private streamService: StreamService) { }

  ngOnInit() {
    this.subscriberArray = [];
    // @ts-ignore
    for (const s in this.stream.subscribers) {
      this.subscriberArray.push(this.stream.subscribers[s]);
    }
    console.log(this.stream);
    // @ts-ignore
      this.streamService.getUser(this.stream.publisher.stream)
        .then((user) => {
          this.users = user;
          console.log(this.users);
        });

    this.streamService.getStreamInfo(this.stream.publisher.stream)
      .then((response: any) => {
        this.subscriberCount = response.viewers;
      });
  }

  toStream() {
    this.streamService.setStreamer(this.stream.publisher.stream);
    this.router.navigateByUrl('/stream/' + this.stream.publisher.stream);
  }
}

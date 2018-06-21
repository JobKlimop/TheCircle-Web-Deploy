import { Component, OnInit } from '@angular/core';
import {Stream} from '../../_models/stream.model';
import {StreamService} from '../../_services/stream.service';
import {User} from '../../_models/user.model';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  streams: Stream[];
  users: User[];
  address: '../../../assets/img/video.jpg';

  constructor(private streamService: StreamService) { }

  ngOnInit() {
    this.streams = [];
    console.log(this.streams);
    this.streamService.getAllStreams()
      .then((streams) => {
        this.streams = streams;
        console.log(streams);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}

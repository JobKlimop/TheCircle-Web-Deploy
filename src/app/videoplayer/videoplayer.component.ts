import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit {

  stream = {
    source: 'http://localhost:8000/live/android/index.mpd'
  };

  constructor() {
  }

  ngOnInit() {
  }

}

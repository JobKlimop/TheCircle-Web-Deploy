import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import flvjs from 'node_modules/flv.js';

@Directive({
  selector: '[appVideoplayer]'
})

export class VideoplayerDirective implements OnInit {

  private url: string = 'http://localhost:8000/live/android.flv';

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
    this.renderer.setAttribute(this.el.nativeElement, 'controls', null);
    this.renderer.setAttribute(this.el.nativeElement, "src", this.url);
    this.createPlayer();
  }

  createPlayer() {
    var flvPlayer:any;
    if (flvjs.isSupported()) {
      console.log('FLV is supported');
    }
    var url = this.el.nativeElement.getAttribute('src');
    console.log(url);
    var mediasource = {
      type: 'flv',
      url: url,
      hasAudio: true,
      hasVideo: true,
      isLive: true
    };
    flvPlayer = flvjs.createPlayer(mediasource);
    flvPlayer.attachMediaElement(this.el.nativeElement);
    flvPlayer.load();
    flvPlayer.play();
    console.log(flvPlayer);
  }

}

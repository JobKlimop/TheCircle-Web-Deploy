import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {environment} from '../../environments/environment';
import flvjs from 'node_modules/flv.js';
import {StreamService} from '../_services/stream.service';

@Directive({
  selector: '[appVideoplayer]'
})
export class VideoplayerDirective {
  private videoUrl = environment.videoStreamApiUrl;

  private streamerName: string = this.streamService.getStreamer();

  constructor(private renderer: Renderer2, private el: ElementRef, private streamService: StreamService) {
    this.renderer.setStyle(this.el.nativeElement, 'height', '360px');
    this.renderer.setStyle(this.el.nativeElement, 'width', '640px');
    this.renderer.setAttribute(this.el.nativeElement, 'controls', null);
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.videoUrl + '/' + this.streamerName + '.flv');
    this.createPlayer();
  }

  createPlayer() {
    let flvPlayer: any;
    if (flvjs.isSupported()) {
      console.log('FLV is supported');
    }

    const url = this.el.nativeElement.getAttribute('src');
    console.log(url);
    const mediasource = {
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

import {subscriptionLogsToBeFn} from 'rxjs/internal/testing/TestScheduler';

export class Stream {
  public stream: string;
  public slogan: string;
  public ip: string;
  public subscribers: number;
  public publisher: string;

  constructor(stream: string, slogan: string, ip: string, subscribers: number, publisher: string) {
    this.stream = stream;
    this.slogan = slogan;
    this.ip = ip;
    this.subscribers = subscribers;
    this.publisher = publisher;
  }
}

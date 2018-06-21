import {Injectable} from '@angular/core';
import { AuthService } from './auth.service';
const crypto = require('crypto-js');
const jsrsasign = require('jsrsasign');


@Injectable()
export class EncryptionService {
  privateKey: string;
  crt: string;
  
  constructor(private authService: AuthService) {
    this.privateKey = this.authService.privateKey;
    this.crt = this.authService.crt;
  }

  
  public sign(message) {
    var timestamp = Math.round((new Date()).getTime() / 1000) ;

    const md = new jsrsasign.KJUR.crypto.MessageDigest({'alg': 'sha256', 'prov': 'cryptojs'});
    md.updateString(message + timestamp);
    const hashValueHex = md.digest();

    const sig = new jsrsasign.KJUR.crypto.Signature({'alg': 'SHA256withRSA'});
    sig.init(this.privateKey);
    sig.updateString(hashValueHex);
    const signature = sig.sign();
    const messageBody = {content: message, signature: signature, certificate: this.crt, timestamp: timestamp, room: ''};

    return messageBody;
  }

  public verify(message) {
    // Check if the message isn't over 5 seconds old.
    if (!(message.timestamp < ( Math.round((new Date()).getTime() / 1000) + 5)))
    {
      return false;
    }

    const md = new jsrsasign.KJUR.crypto.MessageDigest({'alg': 'sha256', 'prov': 'cryptojs'});
    md.updateString(message.content + message.timestamp);
    const hashValueHex = md.digest();

    const sig = new jsrsasign.KJUR.crypto.Signature({'alg': 'SHA256withRSA'});
    sig.init(message.certificate);
    sig.updateString(hashValueHex);
    const isvalid = sig.verify(message.signature);
    return isvalid;
  }
}

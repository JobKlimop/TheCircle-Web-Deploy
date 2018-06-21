import { Component, OnInit, Input } from '@angular/core';
import { EncryptionService} from '../../../_services/encryption.service';
import { ChatService } from '../../../_services/chat.service';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  // Track the current reply message.
  message = "";
  messages = this.chatService.messages;

  @Input() streamer: string
  

  constructor(private encryptionService: EncryptionService, private chatService: ChatService, private authService: AuthService) { 
    // This setUsername needs to be removed when authorization and routing is implemented.
    this.messages = chatService.messages;
  }

  ngOnInit() {


    this.chatService.connectionChanged
    .subscribe((res) => {
      this.chatService.joinRoom(this.streamer)
    })
    /* Example messages. 
    this.messages.push({content: "Fellas, I am about to stream!", user: 'Toby'});
    this.messages.push({content: "Don't give a h*ck!", user: 'Kraai'});
    this.messages.push({content: "Yeah this guy's about as entertaining as a dumpster fire...", user: 'Boboenderie'});
    this.messages.push({content: "Fellas, I am about to stream!", user: 'Toby'});
    this.messages.push({content: "Don't give a h*ck!", user: 'Kraai'});
    this.messages.push({content: "Yeah this guy's about as entertaining as a dumpster fire...", user: 'Boboenderie'});
    this.messages.push({content: "Fellas, I am about to stream!", user: 'Toby'});
    this.messages.push({content: "Don't give a h*ck!", user: 'Kraai'});
    this.messages.push({content: "Yeah this guy's about as entertaining as a dumpster fire...", user: 'Boboenderie'});
    this.messages.push({content: "Fellas, I am about to stream!", user: 'Toby'});
    this.messages.push({content: "Don't give a h*ck!", user: 'Kraai'});
    this.messages.push({content: "Yeah this guy's about as entertaining as a dumpster fire...", user: 'Boboenderie'});
    */

    this.chatService.messagesChanged
    .subscribe((newMessages) => {
      this.messages = newMessages
    });

    // Bootleg way to submit with enter button, whoops.
    var input = document.getElementById("mytext");

    // Execute a function when the user releases a key on the keyboard.
    input.addEventListener("keyup", function(event) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Trigger the button element with a click
        document.getElementById("submit").click();
      }
    });
  }




  send(){
    // Commented because sign doesn't work properly without the auth service.
    let message = this.encryptionService.sign(this.message)
    message.room = this.streamer
    this.chatService.sendMessage(message);

    // Empty out message field again.
    this.message = "";
  }
}

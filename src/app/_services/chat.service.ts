import { Injectable, Output, EventEmitter } from '@angular/core';
import { AuthService } from './auth.service';

import { Chatmessage } from '../_models/chatmessage';
import { EncryptionService } from './encryption.service';

const host = 'http://the-circle-chat2.herokuapp.com/';
// const host =  "ws://145.49.24.24:3000"
// const host =  "ws://145.49.52.76:3000"


let socket = require('socket.io-client');


@Injectable()

export class ChatService {
    @Output() messagesChanged: EventEmitter<Array<string>> = new EventEmitter();
    @Output() viewersChanged: EventEmitter<String> = new EventEmitter();
    @Output() connectionChanged: EventEmitter<string> = new EventEmitter();


    public authservice: AuthService;
    public messages = new Array();
    public viewers = new String;

    constructor(authService: AuthService, private encryptionService: EncryptionService){
         
        socket = socket.connect(host, {
            transports: ['websocket'],
            rejectUnauthorized: false
        });
        this.addEventHandlers();
        this.authservice = authService;
     }



    addEventHandlers(){
        socket.on('connect', () => {
            socket.emit("verify_identity", {"certificate":this.authservice.crt})
        })

        socket.on('verified', (verified) => {
            this.connectionChanged.emit('true')
            console.log(verified)
        })

        socket.on("history", (history) => {
            console.log(history.history)
            for(let m of history.history){
                if(this.encryptionService.verify(m)){
                    this.messages.push(m)
                }
            }
            this.messages.reverse();
            this.messagesChanged.emit(this.messages)
        })

        // Fires after a connection error.
        socket.on('connect_error', (error) => {
            console.log(error);
        });

        // Fires after the connection times out.
        socket.on('connect_timeout', (timeout) => {
            console.log(timeout);
        });

        // Fires after an error.
        socket.on('error', (error) => {
            console.log(error);
        });

        // Fires after disconnecting from the server.
        socket.on("disconnect", (reason) => {
            console.log(reason);
        });

        // Fires after successfully reconnecting to the server.
        socket.on('reconnect', (attemptNumber) => {
            console.log("Reconnected after " + attemptNumber + " attempts");
        });

        // Fires after each reconnect attempt.
        // "reconnecting" event does the same.
        socket.on('reconnect_attempt', (attemptNumber) => {
            console.log("Trying to reconnect, attempt " + attemptNumber);
        });

        // Fires after a reconnection attempt error.
        socket.on('reconnect_error', (error) => {
            console.log(error);
        });

        // Fires after failing to reconnect after certain number of tries.
        socket.on('reconnect_failed', () => {
            console.log("Failed to reconnect");
        });

        // Fires when pinging the server, pinging happens automatically.
        socket.on('ping', () => {
            console.log("Pinging server...");
        });

        // Fires when a ping response is received from the server.
        socket.on('pong', (latency) => {
            console.log("Server latency: " + latency + "ms");
        });


        // CUSTOM EVENTS

        // Fires when receiving a message from the server.
        // contains the room the message is meant for, the message sender & the message itself
        socket.on("message", (message) => {
            // When receiving a message the messages is verified, if the message is ok it's addes to the list of messages.
            // Otherwise nothing is done with the message.
            console.log(message.timestamp + " " + message.room + " " + message.user + ": " + message.content);
            if(this.encryptionService.verify(message)){
                this.addMessage(message)
                console.log(message)
            }else{

            }
        });

        // Fires when receiving connection info.
        // info contains:
        // 	    user        username associated with the connection
        // 		rooms       array of rooms the user is in
        // 		server      server url the user is connected to
        // 		dyno        heroku dyno the user is connected to
        // 		worker      worker the user is connected to
        socket.on("connection_info", (info) => {
            console.log(info);
        });

        // Fires after joining a room.
        socket.on("room_joined", (room) => {
            console.log("Joined room " + room);
            socket.emit("history", room)
        });

        // Fires after leaving a room.
        socket.on("room_left", (room) => {
            console.log("Left room " + room);
        });

        // Fires after setting a username.
        socket.on("username_set", (username) => {
            console.log("Username set to " + username);
        });

        // Fires after receiving the amount of clients connected to a room.
        // Response contains the name of the room and the amount of clients connected to it.
        socket.on("client_count", (response) => {
            console.log(response.room + " has " + response.numberOfClients + " clients connected");
            this.changeViewers(response.numberOfClients);
        });
    }

    // Send a message to a room by emitting the "message" event and including the name of the room and your message.
    // You can only send messages after providing a username by emitting the "set_username" event & by having joined the
    // room you are sending the message to.
    sendMessage(message) {
        socket.emit("message", message);
        socket.emit("connection_info");
    }

    // Before you can send messages, you need to provide a username.
    // Do this by emitting the "set_username" event and sending your username.
    setUsername(username) {
        socket.emit("set_username", username);
    }

    // Subscribe to a room by emitting the "join_room" event and sending the name of the room you want to join.
    // The name of the room is the username of the room owner (the streamer).
    joinRoom(room) {
        socket.emit("join_room", room);
    }

    // Unsubscribe from a room by emitting the "leave_room" event and sending the name of the room you want to leave.
    // The name of the room is the username of the room owner (the streamer).
    leaveRoom(room) {
        socket.emit("leave_room", room);
    }

    // Emit a "connection_info" event to receive information about the connection (username, rooms joined, etc.).
    getConnectionInfo() {
        socket.emit("connection_info");
    }

    // Emit a "client_count" event to request the amount of connected clients of a given room you are in.
     getClientCount(room) {
        socket.emit("client_count", room);
    }

    addMessage(recMessage){
        // When a message is verified it gets added to the array of messages and the messagesChanged event is emitted, this wil tell all
        // subcribed components the a message has been received and also sends the new array.
        this.messages.push(recMessage)
        this.messagesChanged.emit(this.messages)
        //socket.emit("client_count", "room-1");
    }

    // Update viewers based on client_count in a room.
    changeViewers(newViewers){
        this.viewers = newViewers;
        this.viewersChanged.emit(this.viewers)
        console.log(this.viewers);
    }

    getHistory(){
        socket.emit("history", "room-1")
    }
}

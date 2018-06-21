export class Chatmessage {
    public timestamp: string;
    public room: string;
    public user: string;
    public content: string;

    constructor(timestamp: string, room: string, user: string, content: string)
    {
        this.timestamp = timestamp;
        this.room = room;
        this.user = room;
        this.content = content;
    }
}
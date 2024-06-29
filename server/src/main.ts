import type * as Party from "partykit/server"

export default class UsePartyRefServer implements Party.Server {
    options: Party.ServerOptions = {
        hibernate: true
    }

    constructor(readonly room: Party.Room) {
        this.room = room
    }

    async onConnect(connection: Party.Connection) {
        const currentValue = await this.room.storage.get("currentValue")
        connection.send(JSON.stringify(currentValue))
    }

    onMessage(message: string, sender: Party.Connection) {
        const messageData: { data: any } = JSON.parse(message)
        this.room.storage.put("currentValue", messageData.data)
        this.room.broadcast(JSON.stringify(messageData.data), [sender.id])
    }
}

UsePartyRefServer satisfies Party.Worker

import type * as Party from "partykit/server"

export default class UsePartyRefServer implements Party.Server {
    options: Party.ServerOptions = {
        hibernate: true
    }

    constructor(readonly room: Party.Room) {
        this.room = room
    }

    /**
     * Handle writing and reading data to and from the storage
     * @param message
     * @param sender
     */
    async onMessage(message: string, sender: Party.Connection) {
        const messageData: { operation: string, key: string, data?: any } = JSON.parse(message)

        if (messageData.operation === "write") {
            const localData = await this.room.storage.get(messageData.key)
            if (JSON.stringify(localData) === JSON.stringify(messageData.data)) return
            await this.room.storage.put(messageData.key, messageData.data)
            this.room.broadcast(JSON.stringify(messageData.data), [sender.id])
        } else if (messageData.operation === "read") {
            const remoteData = await this.room.storage.get(messageData.key)
            if (remoteData !== undefined && JSON.stringify(remoteData) !== JSON.stringify(messageData.data)) {
                sender.send(JSON.stringify(remoteData))
            }
        }
    }

    /**
     * Delete all data associated with this room when the last connection closes
     * @param connection
     */
    async onClose(connection: Party.Connection) {
        if ([...this.room.getConnections()].length === 0) {
            const roomData = [...(await this.room.storage.list()).keys()]
            for (const key of roomData) {
                await this.room.storage.delete(key)
            }
        }
    }
}

UsePartyRefServer satisfies Party.Worker

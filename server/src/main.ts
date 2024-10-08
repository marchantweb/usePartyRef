import type * as Party from "partykit/server"
import RateLimiterMemory from "rate-limiter-flexible/lib/RateLimiterMemory.js"

// Set the maximum message size to 128 KB
const MAX_MESSAGE_SIZE = 1024 * 512

// Rate limit the server to 20 requests/sec per client, as the average over 2 minute intervals
const RATE_LIMITER_OPTS = {
    points: 1200,
    duration: 60,
}

export default class UsePartyRefServer implements Party.Server {
    options: Party.ServerOptions = {
        hibernate: true
    }
    private rateLimiter: RateLimiterMemory

    constructor(readonly room: Party.Room) {
        this.room = room
        this.rateLimiter = new RateLimiterMemory(RATE_LIMITER_OPTS)
    }

    /**
     * Handle writing and reading data to and from the storage
     * @param message
     * @param sender
     */
    async onMessage(message: string, sender: Party.Connection) {
        this.rateLimiter.consume(sender.id, 1)
            .then(async () => {
                if (message.length > MAX_MESSAGE_SIZE) {
                    sender.send(JSON.stringify({error: "Message too large"}))
                    return
                }

                let messageData: { operation: string, key: string, data?: any }
                try {
                    messageData = JSON.parse(message)
                } catch (error) {
                    sender.send(JSON.stringify({error: "Invalid JSON"}))
                    return
                }

                if (!this.isValidOperation(messageData)) {
                    sender.send(JSON.stringify({error: "Invalid operation"}))
                    return
                }

                const sanitizedKey = this.sanitizeKey(messageData.key)

                if (messageData.operation === "write") {
                    await this.handleWrite(sanitizedKey, messageData.data, sender)
                } else if (messageData.operation === "read") {
                    if ([...this.room.getConnections()].length === 1) {
                        await this.handleWrite(sanitizedKey, messageData.data, sender)
                    } else {
                        await this.handleRead(sanitizedKey, messageData.data, sender)
                    }
                }
            })
            .catch((rateLimiterRes) => {
                sender.send(JSON.stringify({error: `Too many requests, please wait ${rateLimiterRes.msBeforeNext}ms`}))
                return
            })
    }

    /**
     * Store a key-value pair in the storage and broadcast the change to all other connections
     * @param key
     * @param data
     * @param sender
     * @private
     */
    private async handleWrite(key: string, data: any, sender: Party.Connection) {
        const localData = await this.room.storage.get(key)
        if ((JSON.stringify(localData) === JSON.stringify(data))) return
        await this.room.storage.put(key, data)
        this.room.broadcast(JSON.stringify({
            key,
            data
        }), [sender.id])
    }

    /**
     * Retrieve a key-value pair from the storage and send it back to the requesting client
     * @param key
     * @param clientData
     * @param sender
     * @private
     */
    private async handleRead(key: string, clientData: any, sender: Party.Connection) {
        const remoteData = await this.room.storage.get(key)
        if (remoteData !== undefined && JSON.stringify(remoteData) !== JSON.stringify(clientData)) {
            sender.send(JSON.stringify({
                key,
                data: remoteData
            }))
        }
    }

    /**
     * Check if the message is a valid operation (read or write)
     * @param data
     * @private
     */
    private isValidOperation(data: any): boolean {
        return (
            data &&
            typeof data.operation === "string" &&
            ["read", "write"].includes(data.operation) &&
            typeof data.key === "string" &&
            (data.operation === "read" || data.data !== undefined)
        )
    }

    /**
     * Sanitize input keys
     * @param key
     * @private
     */
    private sanitizeKey = (key: string) => key.replace(/[^\w.-]/g, '_').substr(0, 2047)
}

UsePartyRefServer satisfies Party.Worker

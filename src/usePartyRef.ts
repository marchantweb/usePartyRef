import {ref, Ref, watch} from "vue"
import PartySocket from "partysocket"

interface Config{
    default: any;
}

/**
 * A Vue 3 ref that syncs in real-time with other clients using PartyKit.
 * @docs https://github.com/marchantweb/usePartyRef
 */
export default function usePartyRef(config: Config): Ref<any> {

    const localData: Ref<any> = ref(config.default ?? undefined)

    const connection = new PartySocket({
        host: "localhost:1999",
        room: "demo-room"
    })

    connection.addEventListener("message", (event) => {
        localData.value = JSON.parse(event.data)
    })

    watch(localData, (newValue) => {
        connection.send(JSON.stringify({data: newValue}))
    })

    return localData
}

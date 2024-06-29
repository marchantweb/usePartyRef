import {ref, Ref, watch} from "vue"
import PartySocket from "partysocket"

/**
 * A Vue 3 ref that syncs in real-time with other clients using PartyKit.
 * @docs https://github.com/marchantweb/usePartyRef
 * @param value
 */
export default function usePartyRef(value: any): Ref<any> {

    const localData: Ref<any> = ref(value)

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

import {ref, Ref, UnwrapRef, watch} from "vue"
import PartySocket from "partysocket"

interface PartyRefConfig<T> {
    id: string,
    namespace: string,
    defaultValue: T

}

/**
 * A Vue 3 ref that syncs in real-time with other clients using PartyKit.
 * @docs https://github.com/marchantweb/usePartyRef
 */
export default function usePartyRef<T>(config: PartyRefConfig<T>): Ref<T> {

    const localData: Ref<UnwrapRef<T>> = ref(config.defaultValue) as Ref<UnwrapRef<T>>

    const connection = new PartySocket({
        host: "localhost:1999",
        room: config.namespace ?? "demo-room"
    })

    connection.addEventListener("message", (event) => {
        localData.value = JSON.parse(event.data)
    })

    watch(localData, (newValue) => {
        connection.send(JSON.stringify({data: newValue}))
    })

    return localData as Ref<T>
}

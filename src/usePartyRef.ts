import {ref, Ref, UnwrapRef, watch} from "vue"
import PartySocket from "partysocket"

interface PartyRefConfig<T> {
    // The ID of the variable, used to identify it in the PartyKit room.
    id: string,
    // The name of the PartyKit room to use as the server.
    namespace: string,
    // The initial value of the ref, if it's never been set before.
    defaultValue: T
    // How long until the ref resets to the default value after it is last set.
    expires?: number,
    // The host of the PartyKit server.
    host?: string
}

/**
 * A Vue 3 ref that syncs in real-time with other clients using PartyKit.
 * @docs https://github.com/marchantweb/usePartyRef
 */
export default function usePartyRef<T>(config: PartyRefConfig<T>): Ref<T> {

    const localData: Ref<UnwrapRef<T>> = ref(config.defaultValue) as Ref<UnwrapRef<T>>

    const connection = new PartySocket({
        host: config.host ?? "localhost:1999",
        room: config.namespace
    })

    connection.addEventListener("message", (event) => {
        localData.value = JSON.parse(event.data)
    })

    watch(localData, (newValue) => {
        connection.send(JSON.stringify({data: newValue}))
    })

    return localData as Ref<T>
}

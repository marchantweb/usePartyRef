import {ref, Ref, UnwrapRef, watch} from "vue"
import PartySocket from "partysocket"

interface PartyRefConfig<T> {

    // Creates a namespace to keep your data separate from other projects, such as "my-project". Try to make this as unique as possible to avoid conflicts with other projects.
    project: string,

    // The name of the variable, such as "count".
    name: string,

    // The initial value of the ref, if it's never been set before.
    defaultValue: T

    // Self-hosting? Where is the PK server?
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
        room: config.project
    })

    connection.addEventListener("message", (event) => {
        localData.value = JSON.parse(event.data)
    })

    watch(localData, (newValue) => {
        connection.send(JSON.stringify({data: newValue}))
    })

    return localData as Ref<T>
}

import {ref, Ref} from "vue";

/**
 * A reactive ref that updates in real-time with other clients anywhere in the world.
 * No dev-ops required, `usePartyRef` uses websockets to sync data with minimal latency.
 * @docs https://github.com/marchantweb/use-party-ref
 * @param value
 */
export default function usePartyRef(value: any): Ref<any> {

    console.log('usePartyRef called')
    return ref(value);

}

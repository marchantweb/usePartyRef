import {ref, Ref} from "vue";

/**
 * A Vue 3 ref that syncs in real-time with other clients using PartyKit.
 * @docs https://github.com/marchantweb/usePartyRef
 * @param value
 */
export default function usePartyRef(value: any): Ref<any> {

    console.log('usePartyRef called')
    return ref(value);

}

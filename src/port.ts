import { Runtime } from 'webextension-polyfill-ts'

interface IPort {
    instance: Runtime.Port
}

export enum EventType {
    houseList
}

export interface IPortEvent<T> {
    type: EventType,
    data: T,
}

export const Port: IPort = {
    instance: null
}
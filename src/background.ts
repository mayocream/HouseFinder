import { browser, Runtime, WebRequest } from 'webextension-polyfill-ts'
import { mapFilter } from './filters/map'
import { Port } from './port'

browser.runtime.onConnect.addListener((port) => {
    Port.instance = port
    Port.instance.postMessage({data: 'from background'})
    Port.instance.onMessage.addListener(event => {
        console.log(event)
    })
})

browser.webRequest.onBeforeRequest.addListener(mapFilter, {
    urls: [
        '*://map.ke.com/proxyApi/i.c-pc-webapi.ke.com/map/houselist*',
    ],
    types: ['xmlhttprequest'],
}, ['blocking'])
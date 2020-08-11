import { browser } from 'webextension-polyfill-ts'
import { EventType, IPortEvent, Port } from '../port'

export const mapFilter = (details) => {
    if (details.method === 'OPTIONS') {
        return
    }

    const filter = browser.webRequest.filterResponseData(details.requestId)

    const decoder = new TextDecoder('utf-8')
    const encoder = new TextEncoder()

    const data = []
    filter.ondata = event => {
        data.push(new Uint8Array(event.data))
    }

    filter.onstop = event => {
        let combinedLength = 0
        for (let buffer of data) {
            combinedLength += buffer.length
        }
        let combinedArray = new Uint8Array(combinedLength)
        let writeOffset = 0
        for (let buffer of data) {
            combinedArray.set(buffer, writeOffset)
            writeOffset += buffer.length
        }
        let str = decoder.decode(combinedArray)

        let jsonData: any = JSON.parse(str)

        // jsonData.data.list = jsonData?.data?.list?.filter(a => {
        //     const id = extractIdFromActionUrl(a.actionUrl)
        //     return !_.includes(stor.deleteIds, id)
        // })

        // 事件处理
        const e: IPortEvent<any> = {
            type: EventType.houseList,
            data: jsonData,
        }
        Port.instance.postMessage(e)

        str = JSON.stringify(jsonData)

        filter.write(encoder.encode(str))
        filter.close()
    }
}
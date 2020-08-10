import { browser } from 'webextension-polyfill-ts'
import * as _ from 'lodash'

browser.storage.sync.set({test: 1}).then(() => {
    browser.storage.sync.get('test').then(test => {
        console.info('storage.sync', test)
    })
})

interface IStor {
    deleteIds: string[]
}

export const stor: IStor = {
    deleteIds: []
}

export const getDeleteIds = async (): Promise<string[]> => {
    const ids = ((await browser.storage.sync.get('deleteIds'))?.['deleteIds'] as string[]) ?? []
    stor.deleteIds = ids
    return ids
}

export const addDeleteIds = async (id: string) => {
    let deleteIds = await getDeleteIds()
    deleteIds.push(id)
    deleteIds = _.uniq(deleteIds)
    const data: IStor = {
        deleteIds: deleteIds
    }
    await browser.storage.sync.set(data)
    await getDeleteIds()
    console.log('stor', stor)
}
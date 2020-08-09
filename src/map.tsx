import * as ReactDom from 'react-dom'
import { browser } from 'webextension-polyfill-ts'
import Toolbox from './components/toolbox/toolbox'
import * as React from 'react'
import $ from 'jquery'
import { EventType, IPortEvent } from './port'
import { ready } from './utils/observer'

// 管道通信
const messagePort = browser.runtime.connect(browser.runtime.id)
messagePort.postMessage({data: 'test from content script'})

messagePort.onMessage.addListener((event: IPortEvent<any>) => {
  console.log('event', event)
  switch (event.type) {
    case EventType.houseList:
      listDataHandler(event)
      break
  }
})

/**
 * 数据处理
 */
// 1. 列表数据处理
let listData: any
const listDataHandler = (event: IPortEvent<any>) => {
  const listDataClone = listData
  listData = {
    ...event.data?.data,
    list: listDataClone?.resblockCard?.communityId === event.data?.data?.resblockCard?.communityId
      ? [...listDataClone?.list, ...event.data?.data?.list]
      : [...event.data?.data?.list],
  }
  listNodeHandler()
}
// 1.2 列表展示处理
// 左侧租房列表显示
let listDisplay: boolean
const listObserver = new MutationObserver((records) => {
  //console.log(records)
})
const listNodeHandler = () => {
  const nodes: NodeListOf<any> = document.querySelectorAll('.card-item')
  for (const [index, node] of nodes.entries()) {
    if (node.dataset.hfInit) {
      continue
    }
    node.dataset.hfInit = true
    node.onclick = null
    node.firstChild.onclick = null
    // 移除原有 Event Listeners
    // const newItemNode = node.cloneNode(true)
    // node.parentNode.replaceChild(newItemNode, node)
    // node = newItemNode
    // data
    const info = listData.list[index]
    //console.log(info)
  }
}

// 创建工具栏
let toolboxContainer: HTMLDivElement

ready('.ditu-house_list', (e) => {
  const listDisplayObserver = new MutationObserver((records) => {
    for (const record of records) {
      if ((record.addedNodes?.[0] as any)?.className === '') {
        // 列表显示
        console.info('列表展示')
        listObserver.observe(document.querySelector('.house-card ul'), {
          childList: true,
        })
      } else if ((record.removedNodes?.[0] as any)?.className === '') {
        // 列表收起
        console.info('列表收起')
        listObserver.disconnect()
      }
    }
  })
  listDisplayObserver.observe(document.querySelector('.ditu-house_list'), {
    childList: true,
  })
})


$.when($.ready).then(() => {

  $(document).on('mouseenter', '.card-item', (e) => {
    let itemNode: any = e.currentTarget

    // 动态添加 DOM 节点
    if (itemNode.dataset.hfToolboxLoaded) {
      toolboxContainer = itemNode.lastChild
    } else {
      // 创建 Toolbox DOM 元素
      toolboxContainer = document.createElement('div')
      toolboxContainer.className = 'toolbox-container'
      itemNode.dataset.hfToolboxLoaded = true
      itemNode.appendChild(toolboxContainer)
    }
    // 动态绑定 React 渲染
    ReactDom.render(<Toolbox/>, toolboxContainer)
  }).on('mouseleave', '.card-item', (e) => {
    ReactDom.unmountComponentAtNode(toolboxContainer)
  })
})

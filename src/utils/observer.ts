const listeners = []
let observer

export function ready(selector, fn) {
    // 储存选择器和回调函数
    listeners.push({
        selector: selector,
        fn: fn,
    })
    if (!observer) {
        // 监听document变化
        observer = new MutationObserver(check)
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
        })
    }
    // 检查该节点是否已经在DOM中
    check()
}

function check() {
    // 检查是否匹配已储存的节点
    for (const listener of listeners) {
        // 检查指定节点是否有匹配
        const elements = document.querySelectorAll(listener.selector)
        for (const element of elements) {
            // 确保回调函数只会对该元素调用一次
            if (!element.ready) {
                element.ready = true
                // 对该节点调用回调函数
                listener.fn.call(element, element)
            }
        }
    }
}
export function Mp (ak) {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
      /* eslint-disable no-undef */
      resolve(BMap)
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + ak
    script.onerror = reject
    document.head.appendChild(script)
  })
}

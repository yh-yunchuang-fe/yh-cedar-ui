/**
 * @author zhangyi
 * @date 2018/9/28
 */
/**
 * 判断是否为对象
 * @param value
 * @returns {boolean}
 * * isObject({})
 * // => true
 *
 * isObject([1, 2, 3])
 * // => true
 *
 * isObject(Function)
 * // => true
 *
 * isObject(null)
 * // => false
 */
export function isObject (value) {
    const type = typeof value
    return value != null && (type == 'object' || type == 'function')
}

/**
 * 弹层显示时禁止滚动
 */
export function fixedBody(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    document.body.style.cssText += 'position:fixed;top:-'+scrollTop+'px;';
}

/**
 * 关闭弹层继续滚动
 */
export function looseBody() {
    var body = document.body;
    body.style.position = '';
    var top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
    body.style.top = '';
}

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


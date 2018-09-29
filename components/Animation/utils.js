import React from 'react'
const defaultKey = `zy_animate_${Date.now()}`

export function getChildrenFromProps(children) {
    if (React.isValidElement(children)) {
        if (!children.key) {
            return React.cloneElement(children, {key: defaultKey});
        }
    }
    return children;
}

export function toArrayChildren(children) {
    const ret = []
    React.Children.forEach(children, (child) => {
        if (child) {
            ret.push(child)
        }
    })
    return ret
}

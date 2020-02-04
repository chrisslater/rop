type Compute = <T>(fn: () => T) => T
export const compute: Compute = (fn) => {
    return fn()
}
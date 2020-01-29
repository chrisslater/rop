export interface Matcher<T> {
    Success: (value: T) => void,
    Fail: (errs: string[]) => void
}

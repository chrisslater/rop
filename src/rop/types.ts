export interface MessageEnvelope {
    code: string
    id?: string
    message?: string
    value?: any
}

export interface Matcher<T> {
    Success: (value: T) => void,
    Fail: (errs: MessageEnvelope[]) => void
}

interface IResult<A> {
    valueOrElse<B>(other: () => B): A | B
    map<B>(func: (value: A) => B): ISuccess<B> | IFail<B>
    matchResult(matches: Matcher<A>): void
    flatten(value: Result<A>): Result<A>
    // flatMap<B>(fn: (value: A, messagese: string[]) => ISuccess<B>): ISuccess<B>
}

export interface ISuccess<A>  extends IResult<A>{
    // constructor(value: A, messages: string[])
    value: A
    messages: MessageEnvelope[]
    // flatMap<B>(fn: (value: A, messagese: string[]) => ISuccess<B>): ISuccess<B>
    // valueOrElse<B>(other: () => B): A | B
    // matchResult(matches: Matcher<A>): void
}
export interface IFail<A> extends IResult<A> {
    value: A | undefined;
    // constructor(value: string | string[]): void
    messages: MessageEnvelope[]
    
    
    // flatMap<B>(fn: (value: string[]) => IFail<B>): IFail<B>
    // valueOrElse<B>(other: () => B): B
    // matchResult(matches: Matcher<A>): void
}

export type Result<A> = ISuccess<A> | IFail<A>

export type Func1<GoodOutput, Input> = (v: Input) => GoodOutput
export type Func2<Output, InputOne, InputTwo> = (input: InputOne) => Func1<Output, InputTwo>
export type Func3<Output, InputOne, InputTwo, InputThree> = (input: InputOne) => Func2<Output, InputTwo, InputThree>

export type LiftR = <A>(result: Result<A>) => <Out>(fun: Func1<Out, A>) => Result<Out>
export type LiftR2 = <A>(result1: Result<A>) => <B>(result2: Result<B>) => <Out>(fun: Func2<Out, A, B>) => Result<Out>
export type LiftR3 = <A>(result1: Result<A>) => <B>(result2: Result<B>) => <C>(result3: Result<C>) => <Out>(fun: Func3<Out, A, B, C>) => Result<Out>


type Messages = {
    [str: string]: (message: MessageEnvelope) => void
}

export type MatchMessage = (messages: Messages) => <A>(result: Result<A>) => void
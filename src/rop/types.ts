export interface MessageEnvelope {
    code: string
    id?: string
    message?: string
    value?: any
    properties?: { [str: string]: any }
}

export interface Matcher<T> {
    Success: (value: T) => void,
    Fail: (errs: MessageEnvelope[]) => void
}

interface IResult<A> {
    valueOrElse<B>(other: () => B): A | B
    map<B>(func: (value: A) => B): ISuccess<B> | IFail<B>
    matchResult(matches: Matcher<A>): void
}

export interface ISuccess<A>  extends IResult<A>{
    value: A
    messages: MessageEnvelope[]
}
export interface IFail<A> extends IResult<A> {
    value: A | undefined;
    messages: MessageEnvelope[]
}

export type Result<A> = ISuccess<A> | IFail<A>

export type Func1<GoodOutput, Input> = (v: Input) => GoodOutput
export type Func2<Output, InputOne, InputTwo> = (input: InputOne) => Func1<Output, InputTwo>
export type Func3<Output, InputOne, InputTwo, InputThree> = (input: InputOne) => Func2<Output, InputTwo, InputThree>
export type Func4<Output, One, Two, Three, Four> = (input: One) => Func3<Output, Two, Three, Four>
export type Func5<Output, One, Two, Three, Four, Five> = (input: One) => Func4<Output, Two, Three, Four, Five>
export type Func6<Output, One, Two, Three, Four, Five, Six> = (input: One) => Func5<Output, Two, Three, Four, Five, Six>
export type Func7<Output, One, Two, Three, Four, Five, Six, Seven> = (input: One) => Func6<Output, Two, Three, Four, Five, Six, Seven>
export type Func8<Output, One, Two, Three, Four, Five, Six, Seven, Eight> = (input: One) => Func7<Output, Two, Three, Four, Five, Six, Seven, Eight>
export type Func9<Output, One, Two, Three, Four, Five, Six, Seven, Eight, Nine> = (input: One) => Func8<Output, Two, Three, Four, Five, Six, Seven, Eight, Nine>
export type Func10<Output, One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten> = (input: One) => Func9<Output, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten>
export type Func11<Output, One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Eleven> = (input: One) => Func10<Output, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Eleven>
export type Func12<Output, One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Eleven, Twelve> = (input: One) => Func11<Output, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Eleven, Twelve>


export type LiftR = <A>(result: Result<A>) => <Out>(fun: Func1<Out, A>) => Result<Out>
export type LiftR2 = <A>(result1: Result<A>) => <B>(result2: Result<B>) => <Out>(fun: Func2<Out, A, B>) => Result<Out>
export type LiftR3 = <A>(result1: Result<A>) => <B>(result2: Result<B>) => <C>(result3: Result<C>) => <Out>(fun: Func3<Out, A, B, C>) => Result<Out>
export type LiftR4 = <A>(result1: Result<A>) => <B>(result2: Result<B>) => <C>(result3: Result<C>) => <D>(result4: Result<D>) => <Out>(fun: Func4<Out, A, B, C, D>) => Result<Out>
export type LiftR5 = <A>(result1: Result<A>) => <B>(result2: Result<B>) => <C>(result3: Result<C>) => <D>(result4: Result<D>) => <E>(result5: Result<E>) => <Out>(fun: Func5<Out, A, B, C, D, E>) => Result<Out>
export type LiftR6 = <A>(result1: Result<A>) => <B>(result2: Result<B>) => <C>(result3: Result<C>) => <D>(result4: Result<D>) => <E>(result5: Result<E>) => <F>(result6: Result<F>) => <Out>(fun: Func6<Out, A, B, C, D, E, F>) => Result<Out>

export type LiftR7 = <A>(r1: Result<A>) => <B>(r2: Result<B>) => <C>(r3: Result<C>) => <D>(r4: Result<D>) => <E>(r5: Result<E>) => <F>(r6: Result<F>) => <G>(r7: Result<G>) => <Out>(fun: Func7<Out, A, B, C, D, E, F, G>) => Result<Out>
export type LiftR8 = <A>(r1: Result<A>) => <B>(r2: Result<B>) => <C>(r3: Result<C>) => <D>(r4: Result<D>) => <E>(r5: Result<E>) => <F>(r6: Result<F>) => <G>(r7: Result<G>) => <H>(r8: Result<H>) => <Out>(fun: Func8<Out, A, B, C, D, E, F, G, H>) => Result<Out>
export type LiftR9 = <A>(r1: Result<A>) => <B>(r2: Result<B>) => <C>(r3: Result<C>) => <D>(r4: Result<D>) => <E>(r5: Result<E>) => <F>(r6: Result<F>) => <G>(r7: Result<G>) => <H>(r8: Result<H>) => <J>(r9: Result<J>) => <Out>(fun: Func9<Out, A, B, C, D, E, F, G, H, J>) => Result<Out>
export type LiftR10 = <A>(r1: Result<A>) => <B>(r2: Result<B>) => <C>(r3: Result<C>) => <D>(r4: Result<D>) => <E>(r5: Result<E>) => <F>(r6: Result<F>) => <G>(r7: Result<G>) => <H>(r8: Result<H>) => <J>(r9: Result<J>) => <K>(r10: Result<K>) => <Out>(fun: Func10<Out, A, B, C, D, E, F, G, H, J, K>) => Result<Out>

type Messages<ExtraMessages, ReturnValue> = ExtraMessages & {
    // [str: string]: (message: MessageEnvelope) => ReturnValue
    Default: () => ReturnValue
}


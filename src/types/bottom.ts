import { Matcher } from './top'

import { Success, Fail } from '../result'

export interface ResultInterface<T> {
    getOrElse<A>(other: () => A): T | A
    matchResult(matches: Matcher<T>): void
}

export type Result<A> = Success<A> | Fail<A>

export type Func1<GoodOutput, Input> = (v: Input) => GoodOutput
export type Func2<Output, InputOne, InputTwo> = (input: InputOne) => Func1<Output, InputTwo>
export type Func3<Output, InputOne, InputTwo, InputThree> = (input: InputOne) => Func2<Output, InputTwo, InputThree>

export type LiftR = <A>(result: Result<A>) => <Out>(fun: Func1<Out, A>) => Result<Out>
export type LiftR2 = <A>(result1: Result<A>) => <B>(result2: Result<B>) => <Out>(fun: Func2<Out, A, B>) => Result<Out>
export type LiftR3 = <A>(result1: Result<A>) => <B>(result2: Result<B>) => <C>(result3: Result<C>) => <Out>(fun: Func3<Out, A, B, C>) => Result<Out>
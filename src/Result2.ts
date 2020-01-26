type Result<T> = Success<T> | Fail<string[]>

type Func1<GoodOutput, Input> = (v: Input) => GoodOutput
type Func2<Output, InputOne, InputTwo> = (input: InputOne) => Func1<Output, InputTwo>
type Func3<Output, InputOne, InputTwo, InputThree> = (input: InputOne) => Func2<Output, InputTwo, InputThree>

type LiftR = <A>(result: Result<A>) => <Out>(fun: Func1<Out, A>) => Result<Out>
type LiftR2 = <A>(result1: Result<A>) => <B>(result2: Result<B>) => <Out>(fun: Func2<Out, A, B>) => Result<Out>
type LiftR3 = <A>(result1: Result<A>) => <B>(result2: Result<B>) => <C>(result3: Result<C>) => <Out>(fun: Func3<Out, A, B, C>) => Result<Out>

export interface SuccessInterface<T> {
  getOrElse<O>(other: O): T
}

export class Success<T> implements SuccessInterface<T> {
    public value: T;

    constructor(value: T) {
        this.value = value
    }

    static of<A>(value: A): Success<A> {
        return new Success<A>(value);
    }

    getOrElse() {
        return this.value
    }

    // matchWith<R, _, M extends MatchSuccess<T, R>>(matches: M): R {
    //     return matches.Success && matches.Success(this.value)
    // }
}

export class Fail<T> {
    public value: T;

    constructor(value: T) {
        this.value = value
    }

    static of<A>(value: A) {
        return new Fail(value)
    }

    getOrElse<A>(other: A): A {
        return other
    }

    // matchWith<_, R, M extends MatchError<T, R>>(matches: M): R  {
    //     return matches.Error && matches.Error(this.value)
    // }
}


const succeed = <T>(value: T) => Success.of<T>(value)
const fail = (value: string[]) => Fail.of(value)


export const isSuccess = <T>(result: any): result is Success<T> => result instanceof Success;
export const isFail = (result: any): result is Fail<string[]> => result instanceof Fail

const mergeErrors = (error1: Fail<string[]>, error2: Fail<string[]>): Fail<string[]> => fail(error1.value.concat(error2.value));

export const applyR =  <U>(successOrFail: Result<U>) => <T>(fn: Result<Func1<T, U>>): Result<T> => {
  if (isSuccess(fn) && isSuccess(successOrFail)) {
    return Success.of(fn.value(successOrFail.value))
  } else if (isFail(fn) && isSuccess(successOrFail)) {
    return fn;
  } else if (isSuccess(fn) && isFail(successOrFail)) {
    return successOrFail;
  } else if (isFail(fn) && isFail(successOrFail)) {
    return mergeErrors(fn, successOrFail)
  } else {
    // Won't drop in here but added to stop typescript blowing up
    return Fail.of(['ROP_FAIL'])
  }
}

export const liftR: LiftR = (result) => (fun) => {
  const fun1 = succeed(fun);
  const res = applyR(result)(fun1);
  return res;
};
  
export const lift2R: LiftR2 = (result1) => (result2) => (fun) => {
  let f = liftR(result1)(fun);

  const res = applyR(result2)(f);
  return res;
};
    
export const lift3R: LiftR3 = (result1) => (result2) => (result3) => (fun) => {
  let f = lift2R(result1)(result2)(fun);
  const res = applyR(result3)(f);
  return res;
};











export default { Success, Fail, succeed, fail, liftR, lift2R, lift3R, isError, isSuccess }
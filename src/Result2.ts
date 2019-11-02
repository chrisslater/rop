//matchWith: (matches) => matches.Success && matches.Success(value)

interface MatchSuccess<T, A> { 
    Success(val: T): A 
}

interface MatchError<T, A> {
    Error(val: T): A
}

type Matcher<T, A, X, Z> = MatchSuccess<T, A> & MatchError<X, Z>

interface Result<T> {
    matchWith<R>(matches: Matcher<T, R>): R
}

class ResultSuccess<T> {
    public value: T;

    constructor(value: T) {
        this.value = value
    }

    static of<A>(value: A) {
        return new ResultSuccess(value)
    }

    getOrElse() {
        return this.value
    }

    matchWith<R, _, M extends MatchSuccess<T, R>>(matches: M): R {
        return matches.Success && matches.Success(this.value)
    }
}

class ResultError<T> {
    public value: T;

    constructor(value: T) {
        this.value = value
    }

    static of<A>(value: A) {
        return new ResultError(value)
    }

    getOrElse<A>(other: A): A {
        return other
    }

    matchWith<_, R, M extends MatchError<T, R>>(matches: M): R  {
        return matches.Error && matches.Error(this.value)
    }
}

export type RopResult<T> = ResultSuccess<T> | ResultError<string[]>


const succeed = <T>(value: T) => ResultSuccess.of<T>(value)
const fail = (value: string[]) => ResultError.of(value)


export const isSuccess = <T>(result: RopResult<T>): result is ResultSuccess<T> => result instanceof ResultSuccess;
export const isError = <T>(result: RopResult<T>): result is ResultError<string[]> => result instanceof ResultError

const mergeErrors = (error1: ResultError<string[]>, error2: ResultError<string[]>): ResultError<string[]> => fail(error1.value.concat(error2.value));

type Func = (arg: any) => any;

export const applyR = (func: RopResult<Func>) => <Success1>(
    successOrError: RopResult<Success1>
  ): RopResult<Success1> => {
    if (isSuccess(successOrError) && isSuccess(func)) {
      return succeed(func.value(successOrError.value));
    } else if (isSuccess(successOrError) && isError(func)) {
      return func;
    } else if (isError(successOrError) && isSuccess(func)) {
      return successOrError;
    } else if (isError(successOrError) && isError(func)) {
      return mergeErrors(successOrError, func);
    } else {
      return fail(['applyR']);
    }
  };
  
  export const liftR = (fun: Func) => <T>(result: RopResult<T>): RopResult<T> => {
    const fun1 = succeed(fun);
    const res = applyR(fun1)(result);
    return res;
  };
  
  export const lift2R = (fun: Func) => <T>(result1: RopResult<T>) => <X>(result2: RopResult<X>) => {
    let f = liftR(fun)(result1);
    // @ts-ignore
    const res = applyR(f)(result2);
    return res;
  };
  
  export const lift3R = (fun: Func) => <T>(result1: RopResult<T>) => <X>(result2: RopResult<X>) => <Y>(
    result3: RopResult<Y>
  ) => {
    let f = lift2R(fun)(result1)(result2);
    const res = applyR(f)(result3);
    return res;
  };











export default { ResultSuccess, ResultError, succeed, fail, liftR, lift2R, lift3R, isError, isSuccess }
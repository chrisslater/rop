interface MatchSuccess<T, A> { 
    Success(val: T): A 
}

interface MatchError<T, A> {
    Error(val: T): A
}

type Matcher<T, A, X, Z> = MatchSuccess<T, A> & MatchError<X, Z>

// interface Result<T> {
//     matchWith<R>(matches: Matcher<T, R>): R
// }

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
export type RopResult<T> = Success<T> | Fail<string[]>


const succeed = <T>(value: T) => Success.of<T>(value)
const fail = (value: string[]) => Fail.of(value)


export const isSuccess = <T>(result: RopResult<T>): result is Success<T> => result instanceof Success;
export const isError = <T>(result: RopResult<T>): result is Fail<string[]> => result instanceof Fail

const mergeErrors = (error1: Fail<string[]>, error2: Fail<string[]>): Fail<string[]> => fail(error1.value.concat(error2.value));

type Func = (arg: any) => any;

// export const applyR = <T>(func: T) => <Success1>(
//   successOrError: RopResult<Success1>
// ): RopResult<Success1> => {
//   if (isSuccess(successOrError) && isSuccess(func)) {
//     return succeed(func.value(successOrError.value));
//   } else if (isSuccess(successOrError) && isError(func)) {
//     return func;
//   } else if (isError(successOrError) && isSuccess(func)) {
//     return successOrError;
//   } else if (isError(successOrError) && isError(func)) {
//     return mergeErrors(successOrError, func);
//   } else {
//     return fail(['applyR']);
//   }
// };

// Takes a function that is in a suc
export type Func2<T, U> = (v: Success<U> | Fail<string[]>) => Success<T> | Fail<string[]>
export const applyR = <T, U>(fn: Success<Func2<T, U>>) => (value: Success<U> | Fail<string[]>): Success<T> | Fail<string[]> => {
  return fn.value(value)
}

  // export const liftR = <T>(fun: Func) => (result: Success<T> | Fail<string[]>): Success<T> | Fail<string[]> => {
  //   const fun1 = succeed(fun);
  //   const res = applyR<Func, T>(fun1)(result);
  //   return res;
  // };

  export const liftR = <T, U>(fun: Func2<T, U>) => (result: Success<U> | Fail<string[]>): Success<T> | Fail<string[]> => {
    const fun1 = succeed(fun);
    const res = applyR<T, U>(fun1)(result);
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











export default { Success, Fail, succeed, fail, liftR, lift2R, lift3R, isError, isSuccess }
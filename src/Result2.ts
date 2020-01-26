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


export const isSuccess = <T>(result: any): result is Success<T> => result instanceof Success;
export const isError = (result: any): result is Fail<string[]> => result instanceof Fail

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
export type Func1<GoodOutput, Input> = (v: Input) => GoodOutput

export const applyR = <T, U>(fn: RopResult<Func1<T, U>>) => (successOrFail: Success<U> | Fail<string[]>): Success<T> | Fail<string[]> => {
  if (isSuccess(fn) && isSuccess(successOrFail)) {
    return Success.of(fn.value(successOrFail.value))
  } else if (isError(successOrFail)) {
    return successOrFail
  }

  return Fail.of(['Fail'])
}

  // export const liftR = <T>(fun: Func) => (result: Success<T> | Fail<string[]>): Success<T> | Fail<string[]> => {
  //   const fun1 = succeed(fun);
  //   const res = applyR<Func, T>(fun1)(result);
  //   return res;
  // };

  export const liftR = <Output, InputOne>(fun: Func1<Output, InputOne>) => (result: RopResult<InputOne>): RopResult<Output> => {
    const fun1 = succeed(fun);
    const res = applyR<Output, InputOne>(fun1)(result);
    return res;
  };
  
  export type Func2<Output, InputOne, InputTwo> = (input1: InputOne) => Func1<Output, InputTwo>
  export const lift2R = <Output, InputOne, InputTwo>(fun: Func2<Output, InputOne, InputTwo>) => (result1: RopResult<InputOne>) => (result2: RopResult<InputTwo>): RopResult<Output> => {
    let f = liftR(fun)(result1);

    const res = applyR<Output, InputTwo>(f)(result2);
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
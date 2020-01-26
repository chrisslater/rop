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
export type Func2<Output, InputOne, InputTwo> = (input: InputOne) => Func1<Output, InputTwo>
export type Func3<Output, InputOne, InputTwo, InputThree> = (input: InputOne) => Func2<Output, InputTwo, InputThree>

export const applyR =  <T, U>(successOrFail: RopResult<U>) => (fn: RopResult<Func1<T, U>>): RopResult<T> => {
  if (isSuccess(fn) && isSuccess(successOrFail)) {
    return Success.of(fn.value(successOrFail.value))
  } else if (isError(successOrFail)) {
    return successOrFail
  }

  return Fail.of(['Fail'])
}

// export const liftR = <Output, InputOne>(fun: Func1<Output, InputOne>) => (result: RopResult<InputOne>): RopResult<Output> => {
//   const fun1 = succeed(fun);
//   const res = applyR<Output, InputOne>(fun1)(result);
//   return res;
// };

// type LiftR = <InputOne>(result: RopResult<InputOne>) => <Output>(fun: Func1<Output, InputOne>) => RopResult<Output>
export const liftR = <InputOne>(result: RopResult<InputOne>) => <Output>(fun: Func1<Output, InputOne>): RopResult<Output> => {
    const fun1 = succeed(fun);
    const res = applyR<Output, InputOne>(result)(fun1);
    return res;
  };
  
  
  export const lift2R = <InputOne>(result1: RopResult<InputOne>) => <InputTwo>(result2: RopResult<InputTwo>) => <Output>(fun: Func2<Output, InputOne, InputTwo>): RopResult<Output> => {
    let f = liftR(result1)(fun);

    const res = applyR<Output, InputTwo>(result2)(f);
    return res;
  };
  
  
  export const lift3R = <InputOne>(result1: RopResult<InputOne>) => <InputTwo>(result2: RopResult<InputTwo>) => <InputThree>(result3: RopResult<InputThree>) => <Output>(fun: Func3<Output, InputOne, InputTwo, InputThree>): RopResult<Output> => {
    let f = lift2R(result1)(result2)(fun);
    const res = applyR<Output, InputThree>(result3)(f);
    return res;
  };











export default { Success, Fail, succeed, fail, liftR, lift2R, lift3R, isError, isSuccess }
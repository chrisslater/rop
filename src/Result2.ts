type Result<T> = Success<T> | Fail<string[]>
type MergeErrors = (error1: Fail<string[]>) => (error2: Fail<string[]>) => Fail<string[]>

type Func1<GoodOutput, Input> = (v: Input) => GoodOutput
type Func2<Output, InputOne, InputTwo> = (input: InputOne) => Func1<Output, InputTwo>
type Func3<Output, InputOne, InputTwo, InputThree> = (input: InputOne) => Func2<Output, InputTwo, InputThree>

type LiftR = <A>(result: Result<A>) => <Out>(fun: Func1<Out, A>) => Result<Out>
type LiftR2 = <A>(result1: Result<A>) => <B>(result2: Result<B>) => <Out>(fun: Func2<Out, A, B>) => Result<Out>
type LiftR3 = <A>(result1: Result<A>) => <B>(result2: Result<B>) => <C>(result3: Result<C>) => <Out>(fun: Func3<Out, A, B, C>) => Result<Out>

export class Success<T> {
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
}

export class Fail<T> {
  public value: T;

  constructor(value: T) {
    this.value = value
  }

  static of<A>(value: A) {
    return new Fail(value)
  }

  getOrElse<A>(other: () => A): A {
    return other();
  }
}

export const succeed = <T>(value: T) => Success.of<T>(value)
export const fail = (value: string[]) => Fail.of(value)

export const isSuccess = <T>(result: any): result is Success<T> => result instanceof Success;
export const isFail = (result: any): result is Fail<string[]> => result instanceof Fail

export const mergeErrors: MergeErrors = (error1) => (error2) => fail(error1.value.concat(error2.value));

export const applyR =  <U>(successOrFail: Result<U>) => <T>(fn: Result<Func1<T, U>>): Result<T> => {
  if (isSuccess(fn) && isSuccess(successOrFail)) {
    return Success.of(fn.value(successOrFail.value))
  } else if (isFail(fn) && isSuccess(successOrFail)) {
    return fn;
  } else if (isSuccess(fn) && isFail(successOrFail)) {
    return successOrFail;
  } else if (isFail(fn) && isFail(successOrFail)) {
    return mergeErrors(fn)(successOrFail)
  } else {
    // Won't drop in here but added to stop typescript blowing up
    return Fail.of(['ROP_FAIL'])
  }
}

export const liftR: LiftR = (result) => (fun) => applyR(result)(succeed(fun));
  
export const lift2R: LiftR2 = (result1) => (result2) => (fun) => {
  let f = liftR(result1)(fun);
  return applyR(result2)(f);
};
    
export const lift3R: LiftR3 = (result1) => (result2) => (result3) => (fun) => {
  let f = lift2R(result1)(result2)(fun);
  return applyR(result3)(f);
};

export default { 
  Success, 
  Fail, 
  succeed,
  fail, 
  isFail, 
  isSuccess,
  liftR, 
  lift2R, 
  lift3R,  
}

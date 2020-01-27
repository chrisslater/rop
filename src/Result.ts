export type Result<A> = Success<A> | Fail<A>

type Func1<GoodOutput, Input> = (v: Input) => GoodOutput
type Func2<Output, InputOne, InputTwo> = (input: InputOne) => Func1<Output, InputTwo>
type Func3<Output, InputOne, InputTwo, InputThree> = (input: InputOne) => Func2<Output, InputTwo, InputThree>

type LiftR = <A>(result: Result<A>) => <Out>(fun: Func1<Out, A>) => Result<Out>
type LiftR2 = <A>(result1: Result<A>) => <B>(result2: Result<B>) => <Out>(fun: Func2<Out, A, B>) => Result<Out>
type LiftR3 = <A>(result1: Result<A>) => <B>(result2: Result<B>) => <C>(result3: Result<C>) => <Out>(fun: Func3<Out, A, B, C>) => Result<Out>

interface Matcher<T> {
  Success: (value: T) => void,
  Fail: (errs: string[]) => void
}

export const matchResult = <T>(successOrFail: Result<T>) => (matchers: Matcher<T>): void => {
  isSuccess(successOrFail) && matchers.Success(successOrFail.value)
  isFail(successOrFail) && matchers.Fail(successOrFail.value)
}

export const matchResult2 = <T>(matchers: Matcher<T>) => (successOrFail: Result<T>): void => {
  isSuccess(successOrFail) && matchers.Success(successOrFail.value)
  isFail(successOrFail) && matchers.Fail(successOrFail.value)
}
  
interface ResultInterface<T> {
  value: T | string[]
  matchResult(matches: Matcher<T>): void
}

export class Success<T> implements ResultInterface<T> {
  public value: T;
  public messages: string[];

  constructor(value: T, messages: string[] = []) {
    this.value = value
    this.messages = messages
  }

  static of<A>(value: A, messages: string[] = []): Success<A> {
    return new Success<A>(value, messages);
  }

  getOrElse() {
    return this.value
  }

  matchResult(matches: Matcher<T>): void {
    matchResult<T>(Success.of(this.value, this.messages))(matches)
  }
}

export class Fail<T> implements ResultInterface<T> {
  public value: string[];

  constructor(value: string[]) {
    this.value = value;
  }

  static of<A>(value: string[]): Fail<A> {
    return new Fail(value)
  }

  getOrElse<A>(other: () => A): A {
    return other();
  }

  matchResult(matches: Matcher<T>): void {
    matchResult<T>(Fail.of(this.value))(matches)
  }
}

export const succeed = <T>(value: T, messages: string[] = []) => Success.of<T>(value, messages)
export const fail = (value: string[]) => Fail.of(value)

export const isSuccess = <T>(result: any): result is Success<T> => result instanceof Success;
export const isFail = <T>(result: any): result is Fail<T> => result instanceof Fail

// export const mergeErrors: MergeErrors = (error1) => (error2) => fail(error1.value.concat(error2.value));

export const applyR =  <U>(successOrFail: Result<U>) => <T>(fn: Result<Func1<T, U>>): Result<T> => {
  if (isSuccess(fn) && isSuccess(successOrFail)) {
    return Success.of(fn.value(successOrFail.value))
  } else if (isFail(fn) && isSuccess(successOrFail)) {
    return fail(fn.value);
  } else if (isSuccess(fn) && isFail(successOrFail)) {
    return fail(successOrFail.value);
  } else if (isFail(fn) && isFail(successOrFail)) {
    return fail(fn.value.concat(successOrFail.value))
  } else {
    // Won't drop in here but added to stop typescript blowing up
    return fail(['ROP_FAIL'])
  }
}

export const liftR: LiftR = (result) => (fun) => applyR(result)(succeed(fun));
  
export const liftR2: LiftR2 = (result1) => (result2) => (fun) => {
  let f = liftR(result1)(fun);
  return applyR(result2)(f);
};
    
export const liftR3: LiftR3 = (result1) => (result2) => (result3) => (fun) => {
  let f = liftR2(result1)(result2)(fun);
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
  liftR2, 
  liftR3,  
}

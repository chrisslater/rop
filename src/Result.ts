export enum ResultKind {
    Success = 'ResultSuccess',
    Error = 'ResultError',
  }
  
  export interface ResultSuccess<SuccessValue> {
    kind: ResultKind.Success;
    value: SuccessValue;
  }
  
  export interface RopError<Message> {
    kind: ResultKind.Error;
    value: Message[];
  }
  
  export type ResultError = RopError<string>;
  
  export type RopResult<SuccessValue> = ResultSuccess<SuccessValue> | ResultError;
  
  // type Result<ResultSuccess, ResultError> =
  
  export const succeed = <T>(value: T): ResultSuccess<T> => ({ kind: ResultKind.Success, value });
  const wrapInArray = (value: string | string[]): string[] => (Array.isArray(value) ? value : [value]);
  export const fail = (value: string | string[]): ResultError => ({ kind: ResultKind.Error, value: wrapInArray(value) });
  
  export const isSuccess = <T>(result: RopResult<T>): result is ResultSuccess<T> => result.kind === ResultKind.Success;
  export const isError = <T>(result: RopResult<T>): result is ResultError => result.kind === ResultKind.Error;
  
  type Func = (arg: any) => any;
  
  const mergeErrors = (error1: ResultError, error2: ResultError): ResultError => fail(error1.value.concat(error2.value));
  
  // @TODO at the moment on failure, returns the last failure. Update to push all failures to array and return
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
      return fail('applyR');
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
  
  export default { succeed, fail, liftR, lift2R, lift3R, applyR, isSuccess, isError };
  
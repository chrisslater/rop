import {  Result, IFail, ISuccess, Matcher } from './types'
import { matchResult } from './matchResult'
  
const strToStrArray = (value: string | string[]) => Array.isArray(value) ? value: [ value ]

export class Success<T> implements ISuccess<T> {
  public value: T;
  public messages: string[] = [];

  constructor(value: T , messages: string[]) {
    this.value = value
    this.messages = messages
  }

  static of<A>(value: A, messages: string | string[] = []): ISuccess<A> {
    return new Success<A>(value, strToStrArray(messages));
  }

  valueOrElse<A>(_: () => A): T {
    return this.value
  }

  matchResult(matches: Matcher<T>): void {
    matchResult<T>(Success.of(this.value, this.messages))(matches)
  }

  map<A>(func: (value: T) => A): ISuccess<A> {
    return Success.of(func(this.value), this.messages)
  }

  flatten(result: Result<T>): ISuccess<T> {
    const messages = isSuccess(result) ? result.messages : result.value
    return Success.of<T>(this.value, [ ...this.messages, ...messages ])
  }

  flatMap<A>(fn: (value: T, messages: string[]) => ISuccess<A>): ISuccess<A> {
    return fn(this.value, this.messages)
  }
}

export class Fail<T> implements IFail<T> {
  public value: string[];

  constructor(value: string[]) {
    this.value = value;
  }

  static of<A>(value: string | string[]): IFail<A> {
    return new Fail<A>(strToStrArray(value))
  }

  valueOrElse<A>(other: () => A): A {
    return other();
  }

  matchResult(matches: Matcher<T>): void {
    matchResult<T>(Fail.of(this.value))(matches)
  }

  map(): IFail<T> {
    return Fail.of<T>(this.value);
  }

  flatten(result: Result<T>): IFail<T> {
    const messages = isSuccess(result) ? result.messages : result.value
    return Fail.of([...this.value, ...messages])
  }

  flatMap<A>(fn: (value: string[]) => IFail<A>): IFail<A> {
    return fn(this.value)
  }
}

export const succeed = <T>(value: T, messages: string | string[] = []) => Success.of<T>(value, messages)
export const fail = <T>(value: string | string[]) => Fail.of<T>(value)

export const isSuccess = <T>(result: any): result is ISuccess<T> => result instanceof Success;
export const isFail = <T>(result: any): result is IFail<T> => result instanceof Fail

export default { 
  Success, 
  Fail, 
  succeed,
  fail, 
  isFail, 
  isSuccess,  
}

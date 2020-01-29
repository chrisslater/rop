import {  IFail, ISuccess, Matcher } from './types'
import { matchResult } from './matchResult'
  

export class Success<T> implements ISuccess<T> {
  public value: T;
  public messages: string[];

  constructor(value: T, messages: string[] = []) {
    this.value = value
    this.messages = messages
  }

  static of<A>(value: A, messages: string[] = []): Success<A> {
    return new Success<A>(value, messages);
  }

  valueOrElse<A>(_: () => A): T {
    return this.value
  }

  matchResult(matches: Matcher<T>): void {
    matchResult<T>(Success.of(this.value, this.messages))(matches)
  }
}

export class Fail<T> implements IFail<T> {
  public value: string[];

  constructor(value: string[]) {
    this.value = value;
  }

  static of<A>(value: string[]): Fail<A> {
    return new Fail(value)
  }

  valueOrElse<A>(other: () => A): A {
    return other();
  }

  matchResult(matches: Matcher<T>): void {
    matchResult<T>(Fail.of(this.value))(matches)
  }
}

export const succeed = <T>(value: T, messages: string[] = []) => Success.of<T>(value, messages)
export const fail = <T>(value: string[]) => Fail.of<T>(value)

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

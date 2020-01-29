import {  ResultInterface, Matcher } from './types'
import { matchResult } from './rop/matchResult'
  

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

  getOrElse<A>(_: () => A): A | T {
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

  getOrElse<A>(other: () => A): A | T {
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

export default { 
  Success, 
  Fail, 
  succeed,
  fail, 
  isFail, 
  isSuccess,  
}

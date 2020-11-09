import {  Result, IFail, ISuccess, MessageEnvelope, Matcher } from './types'
import { matchResult } from './matchResult'

const toArray = <T>(value: T | T[]): T[] => Array.isArray(value) ? value: [ value ]


export class Success<T> implements ISuccess<T> {
  public value: T;
  public messages: MessageEnvelope[] = [];

  constructor(value: T, messages: MessageEnvelope[]) {
    this.value = value
    this.messages = messages
  }

  static of<A>(value: A, messages: MessageEnvelope | MessageEnvelope[] = []): ISuccess<A> {
    return new Success<A>(value, toArray(messages));
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
}

export class Fail<T> implements IFail<T> {
  public value: undefined;
  public messages: MessageEnvelope[];

  constructor(messages: MessageEnvelope[]) {
    this.messages = messages;
  }

  static of<A>(messages: MessageEnvelope | MessageEnvelope[]): IFail<A> {
    return new Fail<A>(toArray(messages))
  }

  valueOrElse<A>(other: () => A): A {
    return other();
  }

  matchResult(matches: Matcher<T>): void {
    matchResult<T>(Fail.of(this.messages))(matches)
  }

  map<A>(_: (value: T) => A): IFail<A> {
    return Fail.of<A>(this.messages);
  }
}

export const succeed = <T>(value: T, messages: MessageEnvelope | MessageEnvelope[] = []) => Success.of<T>(value, messages)
export const fail = <T>(messages: MessageEnvelope | MessageEnvelope[]) => Fail.of<T>(messages)

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

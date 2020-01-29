import { Success, Fail, succeed, fail } from './result';

describe('succeed', () => {
  let result: Success<string>

  beforeEach(() => {
    result = succeed('hello');

  });

  it('should return an instance of Success', () => {
    expect(result).toBeInstanceOf(Success);
  });

  it('should contain matching value', () => {
    expect(result.value).toEqual('hello')
  });
});

describe('fail', () => {
  let result: Fail<string[]>;

  beforeEach(() => {
    result = fail(['FAIL']);
  });

  it('should return a an instance of Fail', () => {
    expect(result).toBeInstanceOf(Fail);
  });

  it('should contain matching value', () => {
    expect(result.value).toEqual(['FAIL'])
  })
});

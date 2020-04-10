import { IFail, ISuccess } from './types'
import { Success, Fail, succeed, fail } from './result';

const identity = <A>(value: A): A => value

describe('succeed', () => {
  let result: ISuccess<string>

  beforeEach(() => {
    result = succeed('hello');
  });

  it('should return an instance of Success', () => {
    expect(result).toBeInstanceOf(Success);
  });

  it('should contain matching value', () => {
    expect(result.value).toEqual('hello')
  });

  describe('map', () => {
    it('should pass in the value', () => {
      const res = result.map(identity)
      expect(res).toEqual(succeed('hello'))
    })
  })

  describe('flatten', () => {
    it('should pass in the value', () => {
      const res = result.flatten(succeed('goodbye'))
      expect(res).toEqual(succeed('hello'))
    })
  })
});

describe('fail', () => {
  let result: IFail<string>;

  beforeEach(() => {
    result = fail(['FAIL']);
  });

  it('should return a an instance of Fail', () => {
    expect(result).toBeInstanceOf(Fail);
  });

  it('should contain matching value', () => {
    expect(result.value).toEqual(['FAIL'])
  })

  describe('map', () => {
    it('should pass in the value', () => {
      const res = result.map(identity)
      expect(res).toEqual(fail(['FAIL']))
    })
  })

  describe('flatteen', () => {
    it('should flatten in the value', () => {
      const res = result.flatten(fail(['Fail2']))
      expect(res.value).toEqual(['FAIL', 'Fail2'])
    })
  })
});


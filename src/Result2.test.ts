import Result, { Success, Fail, applyR, Func2, Func1 } from './Result2';

describe('succeed', () => {
  let result: Success<string>

  beforeEach(() => {
    result = Result.succeed('hello');
  });

  it('should return an instance of Success', () => {
    expect(result).toBeInstanceOf(Success);
  });
});

describe('fail', () => {
  let result: Fail<string[]>;

  beforeEach(() => {
    result = Result.fail(['FAIL']);
  });

  it('should return a an instance of Fail', () => {
    expect(result).toBeInstanceOf(Fail);
  });
});

describe('applyR', () => {
  let mockFun: jest.Mock;

  beforeEach(() => {
    mockFun = jest.fn();
  });

  describe('when result is a success', () => {
    let result: Success<string> | Fail<string[]>;

    beforeEach(() => {
      const success = Success.of('foo');
      const fn: Func1<string, string> = (a) => a
      const successFn = fn
      result = applyR<string, string>(successFn)(success);
    });

    it('should ', () => {
        expect(result).toBeInstanceOf(Success)
        expect(result.value).toEqual('foo')
    })
  });
});

describe('liftR', () => {
  describe('When all goes well', () => {
    let result: Success<string> | Fail<string[]>;
    beforeEach(() => {
      const func: Func1<string, string> = (input) => {
        return 'awesome';
      };
      const success1 = Success.of('foo');
      result = Result.liftR<string, string>(func)(success1);
    });

    it('should be a success type', () => {
      expect(result).toBeInstanceOf(Success);
    });

    it('should have a value of awesome', () => {
      expect(result.value).toEqual('awesome');
    });
  });

  describe('When all goes wrong', () => {
    let result: Success<string> | Fail<string[]>;
    beforeEach(() => {
      const func: Func1<string, string> = (input) => {
        return 'awesome';
      };
      const fail = Fail.of(['fail error']);
      result = Result.liftR<string, string>(func)(fail);
    });

    it('should be a fail type', () => {
      expect(result).toBeInstanceOf(Fail);
    });

    it('should have value of error as array', () => {
      expect(result.value).toEqual(['fail error']);
    });
  });
});


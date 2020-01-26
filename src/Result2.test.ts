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
      const successFn = Success.of(fn)
      result = applyR<string, string>(success)(successFn);
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
      const func = () => {
        return 'awesome';
      };
      const success1 = Success.of('foo');
      result = Result.liftR(success1)(func);
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
      const func = () => {
        return 'awesome';
      };
      const fail = Fail.of(['fail error']);
      result = Result.liftR(fail)(func);
    });

    it('should be a fail type', () => {
      expect(result).toBeInstanceOf(Fail);
    });

    it('should have value of error as array', () => {
      expect(result.value).toEqual(['fail error']);
    });
  });
});

describe('lift2R', () => {
  describe('When all goes well', () => {
    let result: Success<string> | Fail<string[]>;
    beforeEach(() => {
      const func = () => () => {
        return 'awesome';
      };
      const success1 = Success.of('foo');
      const success2 = Success.of('foo');
      result = Result.lift2R(success1)(success2)(func);
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
      const func = () => () => {
        return 'awesome';
      };
      const fail = Fail.of(['fail error']);
      const fail2 = Fail.of(['fail error2']);
      result = Result.lift2R(fail)(fail2)(func);
    });

    it('should be a fail type', () => {
      expect(result).toBeInstanceOf(Fail);
    });

    it('should have value of error as array', () => {
      expect(result.value).toEqual(['fail error', 'fail error2']);
    });
  });
});

describe('lift3R', () => {
  describe('When all goes well', () => {
    let result: Success<string> | Fail<string[]>;
    beforeEach(() => {
      const func = () => () => () => {
        return 'awesome';
      };
      const success1 = Success.of('foo');
      const success2 = Success.of('foo');
      const success3 = Success.of('foo');
      result = Result.lift3R(success1)(success2)(success3)(func);
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
      const func = () => () => () => {
        return 'awesome';
      };
      const fail = Fail.of(['fail error']);
      const fail2 = Fail.of(['fail error2']);
      const fail3 = Fail.of(['fail error3']);
      result = Result.lift3R(fail)(fail2)(fail3)(func);
    });

    it('should be a fail type', () => {
      expect(result).toBeInstanceOf(Fail);
    });

    it('should have value of error as array', () => {
      expect(result.value).toEqual(['fail error', 'fail error2', 'fail error3']);
    });
  });
});


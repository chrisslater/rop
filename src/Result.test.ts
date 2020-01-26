import Result, { Success, Fail, applyR } from './Result';

describe('succeed', () => {
  let result: Success<string>

  beforeEach(() => {
    result = Result.succeed('hello');
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
    result = Result.fail(['FAIL']);
  });

  it('should return a an instance of Fail', () => {
    expect(result).toBeInstanceOf(Fail);
  });

  it('should contain matching value', () => {
    expect(result.value).toEqual(['FAIL'])
  })
});

describe('applyR', () => {
  let result: Success<string> | Fail<string[]>;
  let mockFn = jest.fn();

  afterEach(() => {
    mockFn.mockReset()
  })

  beforeEach(() => {
    mockFn.mockReturnValue('awesome');
  });

  describe('when result is a success', () => {
    beforeEach(() => {
      const success = Success.of('foo');
      const successFn = Success.of(mockFn)
      result = applyR(success)(successFn);
    });

    it('should be an instance of Success', () => {
      expect(result).toBeInstanceOf(Success)
        
    });

    it('should contain a property value', () => {
      expect(result.value).toEqual('awesome')
    })
  });
});

describe('liftR', () => {
  let result: Success<string> | Fail<string[]>;
  let mockFn = jest.fn();

  afterEach(() => {
    mockFn.mockReset()
  })

  beforeEach(() => {
    mockFn.mockReturnValue('awesome');
  });

  describe('When all goes well', () => {
    beforeEach(() => {
      const success1 = Success.of('foo');
      result = Result.liftR(success1)(mockFn);
    });

    it('should be a success type', () => {
      expect(result).toBeInstanceOf(Success);
    });

    it('should pass value of success to fn', () => {
      expect(mockFn).toBeCalledWith('foo')
    })

    it('should have a value of awesome', () => {
      expect(result.value).toEqual('awesome');
    });
  });

  describe('When all goes wrong', () => {
    beforeEach(() => {
      const fail = Fail.of(['fail error']);
      result = Result.liftR(fail)(mockFn);
    });

    it('should be a fail type', () => {
      expect(result).toBeInstanceOf(Fail);
    });

    it('should not call func', () =>{
      expect(mockFn).toBeCalledTimes(0)
    });

    it('should have value of error as array', () => {
      expect(result.value).toEqual(['fail error']);
    });
  });
});

describe('lift2R', () => {
  let result: Success<string> | Fail<string[]>;
  let mockFn = jest.fn()
  let mockFn2 = jest.fn();

  afterEach(() => {
    mockFn.mockReset()
    mockFn2.mockReset()
  })

  beforeEach(() => {
    mockFn.mockReturnValue(mockFn2);
    mockFn2.mockReturnValue('awesome')
  });

  describe('When all goes well', () => {
    beforeEach(() => {
      const success1 = Success.of('foo');
      const success2 = Success.of('bar');
      result = Result.liftR2(success1)(success2)(mockFn);
    });

    it('should be a success type', () => {
      expect(result).toBeInstanceOf(Success);
    });

    it('should pass first success value to fn', () => {
      expect(mockFn).toBeCalledWith('foo')
    })

    it('should pass second success value to fn', () => {
      expect(mockFn2).toBeCalledWith('bar')
    })

    it('should have a value of awesome', () => {
      expect(result.value).toEqual('awesome');
    });
  });

  describe('When all goes wrong', () => {
    beforeEach(() => {
      const fail = Fail.of(['fail error']);
      const fail2 = Fail.of(['fail error2']);
      result = Result.liftR2(fail)(fail2)(mockFn);
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
  let result: Success<string> | Fail<string[]>;
  let mockFn = jest.fn();
  let mockFn2 = jest.fn();
  let mockFn3 = jest.fn();

  afterEach(() => {
    mockFn.mockReset();
    mockFn2.mockReset();
    mockFn2.mockReset();
  })

  beforeEach(() => {
    mockFn.mockReturnValue(mockFn2);
    mockFn2.mockReturnValue(mockFn3)
    mockFn3.mockReturnValue('awesome')
  });

  describe('When all goes well', () => {
    beforeEach(() => {
      const success1 = Success.of('foo');
      const success2 = Success.of('bar');
      const success3 = Success.of('baz');
      result = Result.liftR3(success1)(success2)(success3)(mockFn);
    });

    it('should be a success type', () => {
      expect(result).toBeInstanceOf(Success);
    });

    it('should pass first success value to fn', () => {
      expect(mockFn).toBeCalledWith('foo')
    })

    it('should pass second success value to fn', () => {
      expect(mockFn2).toBeCalledWith('bar')
    })

    it('should pass third success value to fn', () => {
      expect(mockFn3).toBeCalledWith('baz')
    })

    it('should have a value of awesome', () => {
      expect(result.value).toEqual('awesome');
    });
  });

  describe('When all goes wrong', () => {
    beforeEach(() => {
      const func = () => () => () => {
        return 'awesome';
      };
      const fail = Fail.of(['fail error']);
      const fail2 = Fail.of(['fail error2']);
      const fail3 = Fail.of(['fail error3']);
      result = Result.liftR3(fail)(fail2)(fail3)(func);
    });

    it('should be a fail type', () => {
      expect(result).toBeInstanceOf(Fail);
    });

    it('should have value of error as array', () => {
      expect(result.value).toEqual(['fail error', 'fail error2', 'fail error3']);
    });
  });
});


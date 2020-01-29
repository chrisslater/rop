import { Result } from './types'
import { liftR, liftR2, liftR3 } from './lift';
import { Success, Fail } from './result'

describe('liftR', () => {
  let result: Result<string>;
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
      result = liftR(success1)(mockFn);
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
      result = liftR(fail)(mockFn);
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
  let result: Result<string>;
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
      result = liftR2(success1)(success2)(mockFn);
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
      result = liftR2(fail)(fail2)(mockFn);
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
  let result: Result<string>;
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
      result = liftR3(success1)(success2)(success3)(mockFn);
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
      result = liftR3(fail)(fail2)(fail3)(func);
    });

    it('should be a fail type', () => {
      expect(result).toBeInstanceOf(Fail);
    });

    it('should have value of error as array', () => {
      expect(result.value).toEqual(['fail error', 'fail error2', 'fail error3']);
    });
  });
});


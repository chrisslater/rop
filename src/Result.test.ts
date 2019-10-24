import RopResult, { ResultSuccess, ResultError, ResultKind } from './RopResult';

describe('succeed', () => {
  let result: ResultSuccess<string>;

  beforeEach(() => {
    result = RopResult.succeed('hello');
  });

  it('should return a Success', () => {
    expect(result.kind).toEqual(ResultKind.Success);
  });
});

describe('fail', () => {
  let result: ResultError<string>;

  beforeEach(() => {
    result = RopResult.fail('FAIL');
  });

  it('should return a Success', () => {
    expect(result.kind).toEqual(ResultKind.Error);
  });
});

describe('applyR', () => {
  let mockFun: jest.Mock;

  beforeEach(() => {
    mockFun = jest.fn();
  });

  describe('when result is a success', () => {
    let result: any;

    beforeEach(() => {
      const success = RopResult.succeed('foo');
      mockFun.mockReturnValueOnce('bar');
      result = RopResult.applyR(mockFun)(success);
    });

    it('should call function with value of foo', () => {
      expect(mockFun).toBeCalledWith('foo');
    });

    it('should return a ResultSuccess', () => {
      expect(result.kind).toBe(ResultKind.Success);
    });

    it('should contain a value returned by function', () => {
      expect(result.value).toBe('bar');
    });
  });
});

// describe('liftR', () => {
//   let result;
//   beforeEach(() => {
//     const createFun = jest.fn().mockReturnValue('bar');
//     const success = RopResult.succeed('foo');
//     result = RopResult.liftR(createFun)(success);
//   });

//   it('should be a success', () => {
//     expect(result.kind).toBe(ResultKind.Success);
//   });

//   // it('should return an object with foo on it', () => {
//   //   expect(result.value).toBe('bar');
//   // });
// });

describe('lift2R', () => {
  describe('When all goes well', () => {
    let result: any;
    beforeEach(() => {
      const func = (val1: any) => (val2: any) => {
        console.log(val1, val2);
        return 'awesome';
      };
      const success1 = RopResult.succeed('foo');
      const success2 = RopResult.succeed('bar');
      result = RopResult.lift2R(func)(success1)(success2);
    });

    it('should be a success type', () => {
      expect(result.kind).toBe(ResultKind.Success);
    });

    it('should have a value of awesome', () => {
      expect(result.value).toBe('awesome');
    });
  });

  describe.only('When all goes unwell', () => {
    let result: any;
    beforeEach(() => {
      const func = (val1: any) => (val2: any) => {
        console.log(val1, val2);
        return 'awesome';
      };
      const failure1 = RopResult.fail('FAIL_REASON_ONE');
      const failure2 = RopResult.fail('FAIL_REASON_TWO');
      result = RopResult.lift2R(func)(failure1)(failure2);
    });

    it('should be a success type', () => {
      expect(result.kind).toBe(ResultKind.Error);
    });

    it('should have a value of awesome', () => {
      expect(result.value).toContain('FAIL_REASON_TWO');
      expect(result.value).toContain('FAIL_REASON_ONE');
    });
  });

  // it('should return an object with foo on it', () => {
  //   expect(result.value).toBe('bar');
  // });
});

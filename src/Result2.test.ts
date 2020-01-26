import Result, { Success, Fail, applyR, Func2 } from './Result2';

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
      const fn: Func2<string, string> = (a) => a
      const successFn = Success.of(fn)
      result = applyR<string, string>(successFn)(success);
    });

    // it('should call function with value of foo', () => {
    //   expect(mockFun).toBeCalledWith('foo');
    // });

    it('should ', () => {
        expect(result).toBeInstanceOf(Success)
        expect(result.value).toEqual('foo')
    })

    // it('should return a ResultSuccess', () => {
    //   expect(result.kind).toBe(ResultKind.Success);
    // });

    // it('should contain a value returned by function', () => {
    //   expect(result.value).toBe('bar');
    // });
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



describe('liftR', () => {
    describe('When all goes well', () => {
      let result: Success<string> | Fail<string[]>;
      beforeEach(() => {
        const func: Func2<string, string> = (input) => {
          return Success.of('awesome');
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
  
    // it('should return an object with foo on it', () => {
    //   expect(result.value).toBe('bar');
    // });
  });
  

describe('lift2R', () => {
  describe('When all goes well', () => {
    let result: any;
    beforeEach(() => {
      const func = (val1: any) => (val2: any): string => {
        console.log(val1, val2);
        return 'awesome';
      };
      const success1 = Success.of('foo');
      const success2 = Success.of('bar');
      result = Result.lift2R(func)(success1)(success2);
    });

    it('should be a success type', () => {
      expect(result).toBeInstanceOf(Success);
    });

    it('should have a value of awesome', () => {
      expect(result.value).toEqual('awesome');
    });
  });

  // it('should return an object with foo on it', () => {
  //   expect(result.value).toBe('bar');
  // });
});

import { Result } from './types'
import { applyR } from './apply';
import { Success } from './result'

describe('applyR', () => {
  let result: Result<string>;
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




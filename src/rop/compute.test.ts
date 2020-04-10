import { compute } from './compute'

describe('compute', () => {

    describe('sync function', () => {
        const result = compute(() => 'foo')

        it('should return the return value of passed function', () => {
            expect(result).toEqual('foo')
        });
    })

    describe('async function', () => {
        let result: string;

        beforeEach(async () => {
            result = await compute(async () => 'foo')
        })
        

        it('should return the return value of passed function', () => {
            expect(result).toEqual('foo')
        });
    })
})
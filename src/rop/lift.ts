import { LiftR, LiftR2, LiftR3 } from './types'
import { succeed } from './result'
import { applyR } from './apply';

export const liftR: LiftR = (result) => (fun) => applyR(result)(succeed(fun));
  
export const liftR2: LiftR2 = (result1) => (result2) => (fun) => {
  let f = liftR(result1)(fun);
  return applyR(result2)(f);
};
    
export const liftR3: LiftR3 = (result1) => (result2) => (result3) => (fun) => {
  let f = liftR2(result1)(result2)(fun);
  return applyR(result3)(f);
};
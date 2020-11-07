import { LiftR, LiftR2, LiftR3, LiftR4, LiftR5, LiftR6, LiftR7, LiftR8, LiftR9, LiftR10 } from './types'
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

export const liftR4: LiftR4 = (result1) => (result2) => (result3) => (result4) => (fun) => {
  let f = liftR3(result1)(result2)(result3)(fun);
  return applyR(result4)(f);
};

export const liftR5: LiftR5 = (result1) => (result2) => (result3) => (result4) => (result5) => (fun) => {
  let f = liftR4(result1)(result2)(result3)(result4)(fun);
  return applyR(result5)(f);
};

export const liftR6: LiftR6 = (result1) => (result2) => (result3) => (result4) => (result5) => (result6) => (fun) => {
  let f = liftR5(result1)(result2)(result3)(result4)(result5)(fun);
  return applyR(result6)(f);
};

export const liftR7: LiftR7 = (result1) => (result2) => (result3) => (result4) => (result5) => (result6) => (result7) => (fun) => {
  let f = liftR6(result1)(result2)(result3)(result4)(result5)(result6)(fun);
  return applyR(result7)(f);
};

export const liftR8: LiftR8 = (result1) => (result2) => (result3) => (result4) => (result5) => (result6) => (result7) => (result8) => (fun) => {
  let f = liftR7(result1)(result2)(result3)(result4)(result5)(result6)(result7)(fun);
  return applyR(result8)(f);
};

export const liftR9: LiftR9 = (result1) => (result2) => (result3) => (result4) => (result5) => (result6) => (result7) => (result8) => (result9) => (fun) => {
  let f = liftR8(result1)(result2)(result3)(result4)(result5)(result6)(result7)(result8)(fun);
  return applyR(result9)(f);
};

export const liftR10: LiftR10 = (result1) => (result2) => (result3) => (result4) => (result5) => (result6) => (result7) => (result8) => (result9) => (result10) => (fun) => {
  let f = liftR9(result1)(result2)(result3)(result4)(result5)(result6)(result7)(result8)(result9)(fun);
  return applyR(result10)(f);
};
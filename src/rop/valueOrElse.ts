export const getOrElse = <A>(other: () => A) => <T>(successOrFail: Result<T>): T | A => 
  (isSuccess(successOrFail)) ? successOrFail.value : other()
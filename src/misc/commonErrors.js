// 공통적으로 자주 발생하는 에러의 이름들 묶음.
// AppError 객체를 생성할 때 name값으로써 사용한다
const commonErrors = {
  authenticationError: `Authentication Error`, // 인증 실피
  authorizationError: `Authorization Error`, // 권한 오류
  inputError: `Input Error`, // 입력 오류
  argumentError: `Argument Error`, //인수 오류
  businessError: `Business Error`, //비즈니스 오류
  configError: `Config Error`, //설정 오류
  databaseError: `DB Error`, //데이터베이스 오류
  fatalError: `Fatal Error`, //시스템 전체에 치명적인 영향을 끼치는 오류
  objectCreationError: `Object Creation Error`, // 객체 생성 오류
  resourceNotFoundError: `Resource Not Found Error`, // 리소스 찾기 오류
  resourceDuplicationError: `Resource Duplication Error`, // 리소스 중복 오류
  remoteStorageError: `Remote Storage Error`, // 저장소 오류
  requestValidationError: `Request Validation Error`, // 유효성 오류
  interalservererError: `Internal Server Error`
};

module.exports = commonErrors;
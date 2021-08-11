import { IsNumberString } from 'class-validator';

export class FindOneDto {
  // 문자열이 숫자일 경우 number로 형변환을 해주는 것 같다.
  @IsNumberString()
  id: number;
}

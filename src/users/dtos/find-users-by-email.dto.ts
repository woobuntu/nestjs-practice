import { IsEmail } from 'class-validator';

export class FindUsersByEmailDto {
  @IsEmail()
  email: string;
}

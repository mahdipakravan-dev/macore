import { IsString, Length } from 'class-validator';
export default class SigninDto {
    @IsString({ message: "لطفا شماره تلفن خود را وارد نمایید" })
    public name!: string;
}
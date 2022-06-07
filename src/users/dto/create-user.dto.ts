import { Field, InputType } from "@nestjs/graphql";
import { IsInt, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateUserDto {
  @Field()
  @IsInt()
  readonly register: number;

  @Field()
  @IsString()
  readonly key: string;

  @Field()
  @IsString()
  readonly login: string;

  @Field()
  @IsString()
  readonly name: string;

  @Field()
  @IsString()
  readonly name_usual: string;

  @Field()
  @IsOptional()
  @IsString()
  readonly email: string;
}

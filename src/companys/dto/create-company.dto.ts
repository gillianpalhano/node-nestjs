import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class CreateCompanyDto {
  @Field()
  @IsString()
  readonly name: string;

  @Field()
  @IsString()
  readonly logo: string;
}

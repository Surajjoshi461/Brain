import { GetUserParams } from "src/types/request/userRequest";

export class GetProfileDto {
  readonly userId: string;

  constructor(params: GetUserParams) {
    this.userId = params.userId;
  }
}

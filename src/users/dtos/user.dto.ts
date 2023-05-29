import { Expose } from "class-transformer";

export class UserDto {

    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    type: string;

    @Expose()
    role: string;

    @Expose()
    mobile: string;

}
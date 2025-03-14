import { ContactUsRequest } from "../../types/request/user/contactUsRequest"

export default class ContactUsDto {
    name: string;
    phoneNumber: string;
    query: string;
    constructor(body: ContactUsRequest) {
        this.name = body.name;
        this.phoneNumber = body.phoneNumber;
        this.query = body.query;
    }
}
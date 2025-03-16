import ContactUsDto from "../commons/dtos/contactUsDto";
import contactUsModel from "../model/contactUsModel";

export default class ContactUsRepository {

    public async storeContact(contactUsDto: ContactUsDto): Promise<void> {
        try {
            await contactUsModel.create(contactUsDto)
        }
        catch (error) {
            throw new Error(`Error in #ContactUsRepository#storeContact. Error: ${error}`);

        }
    }
}
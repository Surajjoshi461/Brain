import ContactUsDto from "../commons/dtos/contactUsDto";
import contactUsModel from "../model/contactUsModel";

export default class ContactUsRepository {
  public async storeContact(contactUsDto: ContactUsDto): Promise<void> {
    await contactUsModel.create(contactUsDto);
  }
}

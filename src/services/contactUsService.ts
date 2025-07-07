import ContactUsRepository from "../repositories/contactUsRepository";
import ContactUsDto from "../commons/dtos/contactUsDto";
import { ContactUsResponse } from "../types/response/contactUsResponse";

export default class ContactUsService {
  private _contactUsRepository: ContactUsRepository;

  constructor(contactUsRespository: ContactUsRepository) {
    this._contactUsRepository = contactUsRespository;
  }

  public async contactUs(
    contactUsDto: ContactUsDto
  ): Promise<ContactUsResponse> {
    //TODO: SURAJ JOSHI - 15/03/2025 - send the user detail with query on admin email
    await this._contactUsRepository.storeContact(contactUsDto);
    return { success: true };
  }
}

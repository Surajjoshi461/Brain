import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";

import constant from "../commons/constant";
import ContactUsDto from "../commons/dtos/contactUsDto";
import { APIResponse, EmptyObject } from "../commons/helper/apiReponse";
import ContactUsService from "../services/contactUsService";
import { ContactUsRequest } from "../types/request/contactUsRequest";
import { ContactUsResponse } from "../types/response/contactUsResponse";

export default class ContactUsController {
    private _contactUsService: ContactUsService;

    constructor(contactUsService: ContactUsService) {
        this._contactUsService = contactUsService;
    }

    public async contactUs(req: Request<EmptyObject, APIResponse<ContactUsResponse>, ContactUsRequest>,
        res: Response<APIResponse<ContactUsResponse>>,
        next: NextFunction) {
        const contactUsDto = new ContactUsDto(req.body);
        try {
            const contactUsResponse = await this._contactUsService.contactUs(contactUsDto);
            const response = new APIResponse<ContactUsResponse>(
                HttpStatus.OK,
                constant.ControllerMessage.SUCCESS,
                contactUsResponse
            )
            res.status(response.status).send(response)
        } catch (error) {
            next(`Error in #ContactUsController#contactUs. Error: ${error}`)
        }
    }
}
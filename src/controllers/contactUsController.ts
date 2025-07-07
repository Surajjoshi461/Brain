import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";

import constant from "../commons/constant";
import ContactUsDto from "../commons/dtos/contactUsDto";
import ContactUsService from "../services/contactUsService";
import { ContactUsRequest } from "../types/request/contactUsRequest";
import { ContactUsResponse } from "../types/response/contactUsResponse";
import {
  APIResponse,
  EmptyObject,
} from "src/commons/helper/apiResponse/apiResponse";
import CustomRequest from "src/commons/helper/customerRequest/CustomRequest";
import { ExpressError } from "src/commons/helper/errorHandler/expressError";

export default class ContactUsController {
  private _contactUsService: ContactUsService;

  constructor(contactUsService: ContactUsService) {
    this._contactUsService = contactUsService;
  }

  public async contactUs(
    req: CustomRequest<EmptyObject, ContactUsResponse, ContactUsRequest>,
    res: Response<APIResponse<ContactUsResponse>>,
    next: NextFunction
  ) {
    const contactUsDto = new ContactUsDto(req.body);
    try {
      const contactUsResponse = await this._contactUsService.contactUs(
        contactUsDto
      );
      const response = new APIResponse<ContactUsResponse>(
        HttpStatus.OK,
        constant.ControllerMessage.SUCCESS,
        contactUsResponse
      );
      res.status(response.status).send(response);
    } catch (error) {
      if (error instanceof ExpressError) {
        next(new ExpressError(error.status, error.message));
      } else if (error instanceof Error) {
        next(new ExpressError(500, error.message));
      } else {
        next(
          new ExpressError(
            500,
            "An unknown error occurred in #ContactUsController#contactUs"
          )
        );
      }
    }
  }
}

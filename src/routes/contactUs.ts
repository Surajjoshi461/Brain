import express from "express";

import ContactUsController from "../controllers/contactUsController";
import ContactUsService from "../services/contactUsService";
import ContactUsRepository from "../repositories/contactUsRepository";
import {
  PathParams,
  QueryParams,
  RequestBody,
  ResponseBody,
} from "src/commons/helper/customerRequest/CustomRequest";
import { ContactUsResponse } from "src/types/response/contactUsResponse";
import { ContactUsRequest } from "src/types/request/contactUsRequest";

const constactRouter = express.Router();
const contactUsRespository = new ContactUsRepository();
const contactUsService = new ContactUsService(contactUsRespository);
const contactUsController = new ContactUsController(contactUsService);

constactRouter.post<
  PathParams,
  ResponseBody<ContactUsResponse>,
  RequestBody<ContactUsRequest>,
  QueryParams
>("/contact-us", (...args) => {
  contactUsController.contactUs(...args);
});

export const router = constactRouter;
export const basePath = "/api/v1/contact";

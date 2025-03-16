import express from 'express'

import ContactUsController from '../controllers/contactUsController';
import ContactUsService from '../services/contactUsService';
import ContactUsRepository from '../repositories/contactUsRepository';

const constactRouter = express.Router();
const contactUsRespository = new ContactUsRepository();
const contactUsService = new ContactUsService(contactUsRespository);
const contactUsController = new ContactUsController(contactUsService);

constactRouter.post('/contact-us', (...args) => {
    contactUsController.contactUs(...args);
})

export const router = constactRouter
export const basePath = '/api/v1/contact'
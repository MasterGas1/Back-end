import { Request, Response } from "express";
import { Types } from "mongoose";

import Service  from './service.model';
import { createServiceService, deleteServiceService, getOneServiceService, getRootServicesService, updateServiceService } from "./service.service";

import { badRequest, handleErrorResponse, internalServerError, notFound, okRequest } from '../helper/handleResponse';
import validateRouteBody from '../helper/validateRoute';
import parseMongoId from "../helper/parseMongoId";
import messages from "../helper/messages";

export const createService = async (req: Request,res: Response) => {

    const response = validateRouteBody(req,res)
        
    if(response)
        return response

    try{
        
        const service = await createServiceService(req.body);
        okRequest(res,service)        

    }catch(error: any){
        console.log(error.message)
        return handleErrorResponse(res, error.message) // Return server error
    }
}

export const getRootServices = async(req: Request, res: Response) => {
    try{
       
        const services = await getRootServicesService();
        
        okRequest(res,services)
    }catch(error){
        console.log(error)
        return internalServerError(res) // Return server error
    }
}

export const getOneService = async(req: Request, res: Response) => {
    try{

        const {id} = req.params;
        
        if(!parseMongoId(id)) //Checks if the id is a uuid
            return badRequest(res,'The id is not uuid');

        const service = await getOneServiceService(id);

        okRequest(res,service)

    }catch(error: any){
        console.log(error);
        return handleErrorResponse(res, error.message); //Return server error
    }
}

export const updateService = async(req:Request,res:Response) => {
    try{
        const {id} = req.params;
        
        if(!parseMongoId(id)) //Checks if the id is a uuid
            return badRequest(res,'The id is not uuid');
        
        const service = await updateServiceService(id, req.body);

        okRequest(res,service) //Return typeService object
    }catch(error:any){
        console.log(error);
        return handleErrorResponse(res, error.message); //Return server error
    }
}

export const deleteService = async(req:Request,res:Response) => {
    
    try{
        const {id} = req.params;

        if(!parseMongoId(id)) //Checks if the id is a uuid
            return badRequest(res,'The id is not uuid');

        await deleteServiceService(id);
        
        okRequest(res,{msg: messages['messagesSp'].serviceDelete});
    }catch(error: any){
        
        return handleErrorResponse(res, error.message); //Return server error
    }
}

 

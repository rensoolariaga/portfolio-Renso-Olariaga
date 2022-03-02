import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs-extra';

// nodemailer
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
// const {mailAccountUser,
//     mailAccountPassword,
//     toEmailAddress } = process.env;

// test ----> fix the .env problem
const mailAccountUser:string = "renso.o.1996@gmail.com";
const mailAccountPassword:string = "qwxbncpaorpmofed";
const toEmailAddress:string = "renso.o.1996@gmail.com";
;

// import the model with the config of mongoDB
import Mail from '../models/Mail';

// ---> import the type of data of express and set the params

export const helloWorld = (req: Request, res: Response) => {
    res.send('Hello world')
};


export async function sendMail(req:Request, res:Response) {
    const { name, lastname, message, email } = req.body;
    const imageUpload = req.file?.path;

    try{
        console.log(`soy el mailAccountUser: ${mailAccountUser}`);
        console.log(`soy el mailAccountPassword: ${mailAccountPassword}`);
        console.log(`soy el toEmailAddress: ${toEmailAddress}`);

        const newMail = {
            name: name,
            lastname: lastname,
            imagePath: imageUpload,
            email: email,
            message: message
        };

        // use the model and send the info of the body
        const mailDb = new Mail(newMail);

        // send the order for the db
        await mailDb.save();

        const fromMail = `${email}`;

        let contentHTML = `
            <h1>Consulta de usuario del portfolio de Renso Olariaga</h1>
            <ul>
                <li>Mail del usuario: ${email}</li>
                <li>Nombre: ${name}</li>
                <li>Apellido: ${lastname}</li>
                <li>Mensaje: ${message}</li>
            </ul>
        `;
    
        const transport = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            secure: true,
            tls: {
              rejectUnauthorized: false
            },
            auth: {
              user: mailAccountUser,
              pass: mailAccountPassword
            }
          }))
        
          const mail = {
            from: fromMail,
            to: toEmailAddress,
            subject: "Portfolio Renso Olariaga",
            text: "Contacto",
            html: contentHTML
          }
        
          transport.sendMail(mail, function(error, response) {
            if (error) {
              console.log(error);
            } else {
              console.log("Message sent: " + response);
            }
        
            transport.close();
          });
    
        return res.json(`info: ${mailDb}`)
    }
    catch
    (error) {
        res.send(error)
    }
};

export async function getMails(req:Request, res:Response) {
// show all the photos in db
    const allMails = await Mail.find();
    return res.json(`all the photos: ${allMails}`)
};

export async function getMailById(req:Request, res:Response) {
    const { id } = req.params;
    try{
        const mailById = await Mail.findById(id);
        return res.json(mailById)
    }
    catch(error){
        res.send(error)
    }
};

export async function deletePhotoById(req:Request, res:Response) {
    const { id } = req.params;
    try{
       const deleteMailById = await Mail.findByIdAndRemove(id);
       if(deleteMailById) {
           // fs.unlink ---> node found and delete(location(originalName))
            await fs.unlink(path.resolve(deleteMailById.imagePath))
       }
       return res.json(`photo deleted: ${deleteMailById}`)
    }
    catch(error) {
        res.send(error)
    }
};

export async function updateMailById(req:Request, res:Response) {
    const { id } = req.query;
    const { name, lastname } = req.body;

    try{
        const updatedMailById = await Mail.findByIdAndUpdate(id, {
            name: name,
            lastname: lastname
        });

        return res.json(`photo updated: ${updatedMailById}`)

    }
    catch(error) {
        res.send(error)
    }
};
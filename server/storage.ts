import { type InsertContact, type ContactMessage } from "@shared/schema";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  createContactMessage(message: InsertContact): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private contactMessages: Map<number, ContactMessage>;
  private transporter: nodemailer.Transporter;
  currentContactId: number;

  constructor() {
    this.contactMessages = new Map();
    this.currentContactId = 1;

    // Configura el transporter de nodemailer usando variables de entorno
    this.transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // true para 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async createContactMessage(insertMessage: InsertContact): Promise<ContactMessage> {
    const id = this.currentContactId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id,
      companyName: insertMessage.companyName || null,
      phone: insertMessage.phone || null
    };
    this.contactMessages.set(id, message);
    
    // Enviar correo electrónico
    await this.sendContactEmail(message);
    
    return message;
  }

  private async sendContactEmail(message: ContactMessage): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: `Nuevo mensaje de contacto de ${message.name}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${message.name}</p>
          <p><strong>Email:</strong> ${message.email}</p>
          ${message.phone ? `<p><strong>Teléfono:</strong> ${message.phone}</p>` : ''}
          ${message.companyName ? `<p><strong>Empresa:</strong> ${message.companyName}</p>` : ''}
          <p><strong>Mensaje:</strong></p>
          <p>${message.message.replace(/\n/g, '<br>')}</p>
        `
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Email enviado correctamente');
    } catch (error) {
      console.error('Error al enviar el email:', error);
    }
  }
}

export const storage = new MemStorage();

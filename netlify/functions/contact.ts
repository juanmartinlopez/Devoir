import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';
import { env } from 'node:process';
import { insertContactSchema, type ContactMessage } from '../../shared/schema';
import { fromZodError } from 'zod-validation-error';
import { ZodError } from 'zod';

// Load environment variables
// dotenv.config(); // Remove this as it's not needed with Netlify

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body || '{}');
    
    // Validate with Zod schema
    const data = insertContactSchema.parse(body);
    
    // Create contact message
    const id = Date.now(); // Simple ID generation
    const message: ContactMessage = { 
      ...data, 
      id,
      companyName: data.companyName || null,
      phone: data.phone || null
    };
    
    // Send email
    await sendContactEmail(message);
    
    return {
      statusCode: 200,
      body: JSON.stringify(message),
    };
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    if (error instanceof ZodError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          message: fromZodError(error).message 
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          message: 'Internal server error' 
        }),
      };
    }
  }
};

async function sendContactEmail(message: ContactMessage): Promise<void> {
  try {
    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS
      }
    });

    // Email options
    const mailOptions = {
      from: env.EMAIL_USER,
      to: env.EMAIL_TO,
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

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el email:', error);
    throw error;
  }
}

export { handler }; 
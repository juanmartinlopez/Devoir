# Devoir

Website for Devoir, a digital solutions company offering software development and digital marketing services.

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/juanmartinlopez/Devoir.git
cd Devoir
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example` and fill in your email credentials.

4. Start the development server:
```bash
npm run dev
```

## Netlify Deployment

### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI globally (if not already installed):
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize Netlify site:
```bash
netlify init
```

4. Deploy to Netlify:
```bash
netlify deploy --prod
```

### Option 2: Deploy via Netlify UI

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).

2. Log in to [Netlify](https://app.netlify.com/).

3. Click "New site from Git" and select your repository.

4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist/public`

5. Add environment variables in the Netlify UI:
   - EMAIL_USER
   - EMAIL_PASS
   - EMAIL_TO
   - VITE_WHATSAPP_NUMBER

6. Click "Deploy site".

## Environment Variables

- `EMAIL_USER`: Your Zoho email address
- `EMAIL_PASS`: Your Zoho app password
- `EMAIL_TO`: Destination email for contact form submissions
- `VITE_WHATSAPP_NUMBER`: WhatsApp number for the contact button (format: country code + number, no spaces or symbols)

## Technologies Used

- Frontend: React, TypeScript, Vite, Tailwind CSS, Shadcn UI
- Backend: Netlify Functions
- Email: Nodemailer with Zoho SMTP
- Form Validation: Zod, React Hook Form 
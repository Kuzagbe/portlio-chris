# EmailJS Setup Guide

The contact form uses EmailJS to send emails to **kuzagbechristopher@gmail.com**.

## Setup Steps

1. **Create an EmailJS account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account (allows 200 emails/month)

2. **Create an Email Service**
   - In EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - **IMPORTANT**: Choose your email provider:
     - **Option 1 (Recommended)**: Use "Gmail" but make sure to:
       1. Click "Connect Account" and authorize with your Gmail
       2. Make sure to grant ALL requested permissions (especially "Send email on your behalf")
       3. If you see "insufficient authentication scopes" error, disconnect and reconnect the service
     - **Option 2 (Easier)**: Use "EmailJS" service (no Gmail setup needed)
       1. This uses EmailJS's own email service
       2. You'll receive emails at the address you configure
       3. No OAuth setup required
   - **Note your Service ID**

3. **Create an Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template structure:
     ```
     From: {{from_name}} <{{from_email}}>
     To: kuzagbechristopher@gmail.com
     
     Subject: New Contact Form Submission from {{from_name}}
     
     Message:
     {{message}}
     
     ---
     Reply to: {{from_email}}
     ```
   - **Note your Template ID**

4. **Get your Public Key**
   - Go to "Account" → "General"
   - Copy your "Public Key"

5. **Set Environment Variables**
   - Create a `.env` file in the root directory
   - Add these variables:
     ```
     VITE_EMAILJS_SERVICE_ID=your_service_id_here
     VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
     VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
     ```

6. **Restart your dev server**
   - Stop the server (Ctrl+C)
   - Run `npm run dev` again

## Testing

1. Fill out the contact form
2. Submit the form
3. Check your email: **kuzagbechristopher@gmail.com**

## Troubleshooting

### "Gmail_API: Request had insufficient authentication scopes" Error

This error means your Gmail service doesn't have the right permissions. To fix:

1. **Go to EmailJS Dashboard** → "Email Services"
2. **Click on your Gmail service**
3. **Click "Disconnect Account"**
4. **Click "Connect Account" again**
5. **When Google asks for permissions, make sure to:**
   - Grant ALL requested permissions
   - Check "Send email on your behalf" permission
   - Complete the full authorization flow
6. **Save the service**

**Alternative Solution**: If Gmail continues to have issues, use the "EmailJS" service instead:
- It doesn't require Gmail OAuth
- Works immediately after setup
- You'll receive emails at the address you configure in EmailJS

### Other Common Issues

- Make sure all environment variables are set correctly
- Check the browser console for any errors
- Verify your EmailJS service is active
- Ensure your email template uses the correct variable names: `{{from_name}}`, `{{from_email}}`, `{{message}}`
- **Restart your dev server** after updating `.env` file


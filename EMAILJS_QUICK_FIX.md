# Quick Fix: Gmail Authentication Error

## Error: "Gmail_API: Request had insufficient authentication scopes"

This means your Gmail service in EmailJS needs to be reconnected with proper permissions.

## Solution 1: Reconnect Gmail Service (Recommended)

1. Go to https://dashboard.emailjs.com/admin/integration
2. Find your Gmail service
3. Click on it to edit
4. Click **"Disconnect Account"**
5. Click **"Connect Account"** again
6. **IMPORTANT**: When Google asks for permissions:
   - Click "Allow" for ALL permissions
   - Make sure "Send email on your behalf" is checked
   - Complete the full authorization
7. Save the service
8. Try submitting the form again

## Solution 2: Use EmailJS Service Instead (Easier)

If Gmail keeps having issues, use EmailJS's built-in service:

1. Go to https://dashboard.emailjs.com/admin/integration
2. Click "Add New Service"
3. Choose **"EmailJS"** (not Gmail)
4. Configure it with your email: **kuzagbechristopher@gmail.com**
5. Save and note the Service ID
6. Update your `.env` file with the new Service ID
7. Restart your dev server

The EmailJS service doesn't require OAuth and works immediately!

## After Fixing

1. Make sure your `.env` file has the correct Service ID
2. Restart your dev server: `npm run dev`
3. Try submitting the contact form again


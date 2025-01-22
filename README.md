To set up and run the project:

Install dependencies:

bash
Copy
npm install
Run development server:

bash
Copy
npm run dev
To deploy to Vercel:

Install Vercel CLI (if not already installed):

bash
Copy
npm install -g vercel
Deploy:

bash
Copy
vercel
Or you can connect your GitHub/GitLab/Bitbucket repository directly to Vercel:

Push your code to a remote repository

Go to vercel.com

Click "Add New" → "Project"

Import your repository

Vercel will automatically detect it's a Next.js app and deploy it

Important Notes:

Make sure you have Node.js (version 18 or newer) installed

The app uses Tailwind CSS for styling, which is already configured in the files

Vercel will handle the TypeScript compilation and deployment automatically

The drag-and-drop functionality will work out of the box with the react-dropzone library

This setup will create a fully functional PDF upload interface with drag-and-drop capabilities, styled with Tailwind CSS, and ready for deployment on Vercel.
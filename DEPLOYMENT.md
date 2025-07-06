# Deployment Guide

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

## Setup Complete ✅

The following files have been configured for deployment:

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `next.config.js` - Next.js configuration for static export
- `public/.nojekyll` - Prevents Jekyll processing
- Updated `package.json` and `.gitignore`

## How It Works

1. **Automatic Deployment**: Every push to the `main` branch triggers the deployment workflow
2. **Static Export**: Next.js builds the app as static files in the `out` directory
3. **GitHub Pages**: The static files are deployed to GitHub Pages
4. **Custom Domain**: Your site is available at `harshitjoshi.com` (configured via CNAME)

## GitHub Repository Settings

To complete the setup, you need to configure your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under "Source", select **GitHub Actions**
4. Your custom domain `harshitjoshi.com` should already be configured

## First Deployment

After pushing these changes to the `main` branch:

1. The GitHub Actions workflow will automatically run
2. Check the **Actions** tab in your GitHub repository to monitor progress
3. Once complete, your site will be live at `harshitjoshi.com`

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (creates static files in 'out' directory)
npm run build
```

## Troubleshooting

- **Action fails**: Check the Actions tab for error details
- **Site not updating**: Ensure you're pushing to the `main` branch
- **Custom domain issues**: Verify CNAME file and GitHub Pages settings
- **Static export errors**: Check that your code doesn't use server-side features

## Important Notes

- This setup uses Next.js static export, so server-side features are disabled
- Images are configured as unoptimized for static hosting
- The `out` directory is ignored by Git as it's generated during build 
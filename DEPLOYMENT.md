# Deployment Guide

This guide covers deploying Leveler to Vercel and other platforms.

## Vercel Deployment (Recommended)

Leveler is optimized for deployment on Vercel.

### Quick Deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

No environment variables or additional configuration needed!

### Manual Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts to complete deployment.

## Environment Variables

This app requires no environment variables for core functionality. All data is stored locally in the user's browser.

If you want to add analytics or other services, you can add environment variables through your hosting platform's dashboard.

## Build Configuration

The app uses Next.js 13 with the App Router. Build settings:

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

## Static Export (Optional)

To generate a static export:

1. Update `next.config.js`:
```js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

2. Build:
```bash
npm run build
```

3. The static files will be in the `out` directory

## Other Platforms

### Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Deploy

### Railway

1. Connect your GitHub repository
2. Railway will auto-detect Next.js
3. Deploy

### Self-Hosted

1. Build the app: `npm run build`
2. Install dependencies: `npm install --production`
3. Start: `npm start`
4. Access at `http://localhost:3000`

Use a process manager like PM2 for production:

```bash
npm install -g pm2
pm2 start npm --name "leveler" -- start
```

## Performance Tips

- Enable Vercel's Edge Network for fast global delivery
- Use Vercel Analytics to monitor performance
- Enable compression in your hosting platform
- Consider adding a CDN for static assets

## Troubleshooting

### Build Fails

- Ensure Node.js 18+ is installed
- Clear cache: `rm -rf .next node_modules && npm install`
- Check for TypeScript errors: `npm run typecheck`

### App Doesn't Load

- Check browser console for errors
- Verify JavaScript is enabled
- Clear browser cache and localStorage
- Try incognito/private mode

## Monitoring

Consider adding:
- Vercel Analytics for performance monitoring
- Sentry for error tracking
- Google Analytics for usage insights

## Security

- All data is client-side (localStorage)
- No API keys or secrets required
- HTTPS is automatically enabled on Vercel
- Content Security Policy recommended for production

## Updates

To update your deployed app:
1. Push changes to your GitHub repository
2. Vercel will automatically rebuild and deploy
3. No downtime required

## Support

For deployment issues:
1. Check Vercel/platform documentation
2. Review build logs
3. Open an issue on GitHub

---

Happy deploying! Your users will love Leveler.

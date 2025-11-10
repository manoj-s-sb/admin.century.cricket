# Azure App Service Deployment Guide

## Configuration for Next.js Standalone Mode

This project is configured to use Next.js standalone mode (`output: 'standalone'`) for Azure App Service deployment.

## Required Azure Configuration

### 1. Startup Command

In Azure Portal, go to your App Service:
- Navigate to **Configuration** > **General settings**
- Set the **Startup Command** to one of the following:

**Option 1 (Recommended):**
```bash
node .next/standalone/server.js
```

**Option 2 (Using startup script):**
```bash
/home/site/wwwroot/startup.sh
```

### 2. Environment Variables

Azure App Service automatically sets the `PORT` environment variable. The application will use this port.

### 3. Build Configuration

The build process should:
1. Run `npm ci` to install dependencies
2. Run `npm run build` to create the standalone build
3. The standalone build will be in `.next/standalone/`

## Important Notes

- The `package.json` start script has been updated to use `node .next/standalone/server.js`
- The `startup.sh` script handles copying static files and public assets if needed
- Make sure Node.js version in Azure matches your local version (currently using Node 22.20.0 in Azure)

## Troubleshooting

If the app doesn't start:
1. Check the logs in Azure Portal > Log stream
2. Verify the startup command is set correctly
3. Ensure the build completed successfully and `.next/standalone` directory exists
4. Check that the PORT environment variable is set (Azure sets this automatically)


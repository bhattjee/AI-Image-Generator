# Security Policy

## Sensitive Data

### API Keys
This application uses the Runware AI API for image generation. API keys should never be committed to version control.

**Current Status:**
- The file `src/services/apiKeyService.ts` contains a placeholder API key (`YOUR_DEVELOPMENT_API_KEY`)
- This placeholder is not a real API key and is safe for development purposes
- For production, you must replace this with environment variable-based configuration

### Environment Variables
- Create a `.env` file in the root directory (already in `.gitignore`)
- Use `.env.example` as a template for required environment variables
- Never commit `.env` files to version control

## Best Practices

### For Development
1. Use the placeholder API key for local development
2. Test with limited API calls to avoid quota exhaustion
3. Keep your `.env` file private and never share it

### For Production
1. **Never hardcode API keys** in source code
2. Use environment variables for all sensitive configuration
3. Consider using a backend proxy to hide API keys from client-side code
4. Implement rate limiting to prevent API abuse
5. Use HTTPS for all API communications
6. Implement proper error handling to avoid exposing sensitive information

### API Key Management
- Store API keys in secure secret management systems (e.g., AWS Secrets Manager, HashiCorp Vault)
- Rotate API keys regularly
- Use different API keys for different environments (dev, staging, prod)
- Monitor API usage for unusual activity

## Reporting Security Issues

If you discover a security vulnerability, please:
1. Do not create a public GitHub issue
2. Contact the project maintainers directly
3. Provide details about the vulnerability and reproduction steps
4. Allow time for the issue to be addressed before public disclosure

## Dependencies

This project uses third-party dependencies. Keep them updated:
- Run `npm audit` regularly to check for vulnerabilities
- Update dependencies with `npm update`
- Review security advisories for used packages

## Client-Side Security Considerations

- This is a client-side application that makes API calls directly from the browser
- API keys exposed in client-side code can be accessed by anyone using the application
- For production, consider implementing a backend service to proxy API requests
- This would allow you to keep API keys server-side and implement additional security measures

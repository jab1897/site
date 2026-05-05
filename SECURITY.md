# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do not open a public GitHub issue.**

Email: campaign@jorgefortexas.com

Include:
- A description of the vulnerability and its potential impact
- Steps to reproduce or a proof-of-concept (if safe to share)
- Your contact information

We will acknowledge your report within 48 hours and aim to release a fix within 14 days for confirmed vulnerabilities.

## Supported Versions

Only the latest production deployment is supported.

## Security Measures

- Security headers: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP
- Cloudflare Turnstile bot protection on public forms
- Per-IP rate limiting (5 submissions/IP/hour) on form endpoints
- Server-side field validation and HTML sanitization
- TCPA consent logging for SMS opt-in submissions
- Honeypot fields on all public forms
- All passwords stored as bcrypt hashes
- JWT for admin session authentication

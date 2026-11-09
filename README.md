# Bay Concrete

Static marketing website for **Bay Concrete**, a licensed and insured concrete contractor serving the San Francisco Bay Area.

Built and maintained by **developer taimur**.

## Overview

Bay Concrete provides residential and commercial concrete work:

- Driveways  
- Stamped & decorative concrete  
- Commercial flatwork  
- Patios & pool decks  
- Foundations & slabs  
- Repair & resurfacing  

The site highlights local Bay Area ground challenges (fault-line movement, settling slabs, soft soils, and drainage) and includes a dedicated appointment booking page so visitors can request a free estimate by service.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage — hero, about, Bay Area problem-solving, services, process, projects, reviews, FAQ |
| `contact.html` | Contact & appointment booking (service, date/time, site concerns, lead details) |
| `404.html` | Custom not-found page |

## Project structure

```
BAY_CONCRETE/
├── index.html
├── contact.html
├── 404.html
├── css/styles.css
├── js/main.js
├── assets/          # logos and project photos
├── favicon.png
├── robots.txt
├── .htaccess        # Apache / Hostinger config
└── README.md
```

## Tech stack

- HTML5  
- CSS3 (custom design tokens, responsive layout)  
- Vanilla JavaScript  
- Google Fonts (Montserrat, Open Sans)  
- Apache `.htaccess` for Hostinger (caching, compression, 404, security headers)

No framework and no build step — open the files or serve the folder statically.

## Local development

```bash
# from the project root
npx serve .
```

Then open the URL shown in the terminal (usually `http://localhost:3000`).

You can also open `index.html` directly in a browser, but a local static server is recommended for accurate routing.

## Features

- Responsive sticky header with CSS mobile navigation  
- Service cards that deep-link into the booking form with the service preselected  
- Appointment request form (name, phone, email, service, preferred date/time, site concern, project details)  
- Clickable phone (`tel:`) and email (`mailto:`) links on the contact page  
- FAQ accordion and contact success state (client-side)  
- Hostinger-ready Apache configuration  

## Deployment (Hostinger)

1. Upload the site files to the hosting `public_html` (or target) directory.  
2. Keep `.htaccess` in place for caching, compression, and the custom 404.  
3. After SSL is active, uncomment the HTTPS redirect rules in `.htaccess` if desired.  
4. Replace placeholder phone/email with live business contact details before go-live.  

## Contact placeholders

Until the client provides final details, the site uses placeholders:

- Phone: `(000) 000-0000`  
- Email: `info@bayconcrete.com`  

The booking form currently validates and shows a success message in the browser. Connect it to an email/form backend (e.g. Formspree, Web3Forms, or Hostinger mail) before production so leads are delivered.

## License

All rights reserved © Bay Concrete.  
Website development by developer taimur.

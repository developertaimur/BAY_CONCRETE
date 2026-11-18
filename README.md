# Bay Concrete

Static marketing website for **Bay Concrete**, a licensed and insured concrete contractor serving the San Francisco Bay Area.

Built and maintained by **developer taimur**.

## Overview

Bay Concrete provides residential and commercial concrete work:

- Driveways  
- Stamped & decorative concrete  
- Place and finish  
- Patios & pool demolition (partial and complete, starting at $7,000)  
- Foundations & slabs  

The site highlights local Bay Area ground challenges (fault-line movement, settling slabs, and drainage) and includes a dedicated appointment booking page so visitors can request a free estimate by service.

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
## Contact

- Phone: `(510) 415-9724`  
- Email: `baycon2027@gmail.com`  

The booking form submits appointment requests to `baycon2027@gmail.com` via [FormSubmit](https://formsubmit.co) AJAX. Open `baycon2027@gmail.com`, find the FormSubmit **Activate Form** email, and click the link once. After activation, new booking requests arrive in that inbox.

## License

All rights reserved © Bay Concrete.  
Website development by developer taimur.

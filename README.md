# CMT Engineering: new website

A rebuild of [cmtengineering.co.za](https://cmtengineering.co.za). All copy, project details, contact details, social links and photos come from the current WordPress site and the company profile PDF. Layout, design and interactions are new.

Static HTML, CSS and vanilla JavaScript. No build step, no database. One small PHP file handles the contact form.

## Pages

| Page | File | Notes |
| --- | --- | --- |
| Home | `index.html` | Hero, welcome, products and services, service cards, project index with photo preview, offices map |
| Our Services | `our-services/index.html` | All 10 services, sticky index, "Learn More" briefs open in a side panel |
| Our Projects | `our-projects/index.html` | Six case studies with galleries, key figures, full project index |
| Contact Us | `contact-us/index.html` | Head Office and Botswana toggle with themed map, contact form |
| 404 | `404.html` | Used by `.htaccess` |

The folders keep the old addresses (`/our-services/`, `/our-projects/`, `/contact-us/`), so Google links and bookmarks keep working. `.htaccess` also redirects the old `/activities/...` pages and the old company profile PDF link.

## Going live

1. Upload everything in this folder (including `.htaccess`) to the web root (`public_html` on cPanel).
2. Contact form: `send.php` emails `rudolph@cmtengineering.co.za` using PHP `mail()`. Create the mailbox `website@cmtengineering.co.za` on the new host (or change `$FROM` at the top of `send.php` to an existing mailbox on the domain), then send a test message. If sending fails, the form offers to open the visitor's email app instead.
3. Check `https://cmtengineering.co.za/activities/goldfields/` redirects to the projects page.

## Editing

* Phone, email, hours, social links and office coordinates live once in `assets/js/site.js` (the `CMT` object) and feed the header, footer and map. The contact page strip and the JSON-LD block in `index.html` repeat them.
* Map: `assets/js/offices.js`. Tiles are Esri Dark Gray Canvas, tinted in `style.css` (`.map-wrap .leaflet-tile-pane`).

## Small copy corrections made

Spelling fixes only, meaning unchanged: "seperator" to "separator", "Danakil Dessert" to "Danakil Desert", "GRPS" to "GPRS", "Poison" to "Poisson", "planted and unplanned" to "planned and unplanned", "cubs" to "cubes", "therefor" to "therefore", "can related" to "can relate", "ho DWS wants in" to "how DWS wants it", "Sibanye Still Water" to "Sibanye Stillwater", "Goldfield" to "Goldfields". Year ranges written as "2016 to 2017" instead of with a dash.

## Credits

Map data &copy; OpenStreetMap contributors, tiles &copy; Esri. Map library: Leaflet 1.9.4.

import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  schemaEntities?: object[];
  priority?: string;
  changefreq?: string;
}

const routes: RouteMeta[] = [
  {
    path: '/',
    title: 'Luma — Free Breathwork App & Online Guided Retention Timer',
    description: 'The #1 free breathwork app & online guided timer. Compatible with Wim Hof Method 30-40 power breaths, retention stopwatch, Apple Watch haptics & zero ads.',
    priority: '1.0',
    changefreq: 'weekly',
    schemaEntities: [
      {
        "@type": "Organization",
        "@id": "https://luma-breath.work/#organization",
        "name": "Luma Breathwork",
        "url": "https://luma-breath.work/",
        "logo": "https://luma-breath.work/favicon.svg",
        "sameAs": [
          "https://apps.apple.com/us/app/luma-breathwork-meditation/id6737122722"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://luma-breath.work/#website",
        "url": "https://luma-breath.work/",
        "name": "Luma Breathwork",
        "description": "Free breathwork app, online guided timer and retention stopwatch for iOS and Apple Watch.",
        "publisher": {
          "@id": "https://luma-breath.work/#organization"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://luma-breath.work/#app",
        "name": "Luma — Breathwork & Retention Timer",
        "operatingSystem": "iOS, watchOS",
        "applicationCategory": "HealthApplication",
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD"
        },
        "url": "https://apps.apple.com/us/app/luma-breathwork-meditation/id6737122722",
        "image": "https://luma-breath.work/screenshots/logo.webp",
        "screenshot": "https://luma-breath.work/screenshots/1.webp",
        "author": {
          "@id": "https://luma-breath.work/#organization"
        },
        "description": "100% free Wim Hof Method compatible breathing app and timer for iOS & Apple Watch. Guided 30-40 power breaths, retention stopwatch, Apple Watch haptics, and zero subscriptions."
      },
      {
        "@type": "FAQPage",
        "@id": "https://luma-breath.work/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is Luma really 100% free with no subscriptions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Luma is completely free forever. There are zero subscriptions, no hidden paywalls, and no advertisements. All breathing timers, retention tools, themes, and Apple Watch features are fully unlocked."
            }
          },
          {
            "@type": "Question",
            "name": "Does Luma support Wim Hof Method breathing and retention times?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Luma is tailored for Wim Hof Method (Iceman) breathwork. It features customizable rounds, power breath pacing (e.g. 30-40 breaths), an automated breath retention stopwatch, and recovery hold countdowns."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use Luma on my Apple Watch?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Luma includes an Apple Watch companion app with custom tactile wrist haptics paired with your iPhone, allowing you to feel every breath pulse on your wrist while your session runs on iPhone."
            }
          },
          {
            "@type": "Question",
            "name": "Does Luma sync with Apple Health?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Luma automatically logs your mindful minutes and tracks heart rate during breathwork directly into Apple Health."
            }
          },
          {
            "@type": "Question",
            "name": "Can I practice Wim Hof breathing in my web browser?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Luma includes an interactive Web Breathing Pacer at https://luma-breath.work/timer, allowing you to practice guided breathing and retention holds without installing an app."
            }
          }
        ]
      }
    ]
  },
  {
    path: '/timer',
    title: 'Free Wim Hof Breathing Timer & Retention Stopwatch | Luma',
    description: 'Free interactive online Wim Hof Method breathing pacer and retention stopwatch. 30-40 power breaths, Tibetan bowl sound chimes, recovery hold countdown.',
    priority: '1.0',
    changefreq: 'weekly',
    schemaEntities: [
      {
        "@type": "WebApplication",
        "@id": "https://luma-breath.work/timer#webapp",
        "name": "Luma Web Breathing Pacer & Retention Timer",
        "url": "https://luma-breath.work/timer",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5 Audio.",
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD"
        },
        "description": "Free online interactive Wim Hof Method breathwork pacer with customizable tempo, round cycles, retention stopwatch, and Tibetan singing bowl acoustic audio."
      }
    ]
  },
  {
    path: '/guide/wim-hof-method',
    title: 'How to Do Wim Hof Breathing Method: Step-by-Step Guide | Luma',
    description: 'Master the Wim Hof breathing technique. Comprehensive 5-step guide covering cyclic hyperventilation, empty-lung retention, recovery holds, and safety.',
    priority: '0.9',
    changefreq: 'weekly',
    schemaEntities: [
      {
        "@type": "HowTo",
        "@id": "https://luma-breath.work/guide/wim-hof-method#howto",
        "name": "How to Practice Wim Hof Method Breathing",
        "description": "Step-by-step instructions to perform cyclic hyperventilation and breath retention safely.",
        "totalTime": "PT15M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Get into a Safe, Comfortable Position",
            "text": "Sit or lie down in a safe environment. Never practice in water, while driving, or standing up."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "30 to 40 Deep Power Breaths",
            "text": "Inhale deeply into belly and chest, then let go passively without forcing the exhale."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Empty Lung Retention Hold",
            "text": "Exhale unforced after the final breath and hold on empty lungs until the urge to breathe arises."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "15-Second Recovery Inhale",
            "text": "Inhale to maximum capacity and hold full for 15 seconds."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Repeat for 3-4 Rounds",
            "text": "Complete 3 to 4 rounds for optimal autonomic and immune benefits."
          }
        ]
      }
    ]
  },
  {
    path: '/retention-times',
    title: 'Wim Hof Retention Times: Benchmarks & Physiology | Luma',
    description: 'What is a normal Wim Hof retention time? Comprehensive round-by-round averages (Rounds 1-4), CO2 physiology, and why your breath hold expands naturally.',
    priority: '0.8',
    changefreq: 'monthly',
    schemaEntities: [
      {
        "@type": "MedicalWebPage",
        "@id": "https://luma-breath.work/retention-times#medical",
        "name": "Wim Hof Retention Times: Benchmarks and Physiology",
        "url": "https://luma-breath.work/retention-times",
        "description": "Round 1 to 4 retention benchmarks, hypocapnia, and oxygen-hemoglobin dissociation mechanics."
      }
    ]
  },
  {
    path: '/science-and-safety',
    title: 'Science of Wim Hof Breathwork: Studies & Safety | Luma',
    description: 'Scientific analysis of Radboud University clinical trials (Kox et al.), respiratory alkalosis, adrenaline surges, and vital Shallow Water Blackout prevention.',
    priority: '0.8',
    changefreq: 'monthly',
    schemaEntities: [
      {
        "@type": "MedicalWebPage",
        "@id": "https://luma-breath.work/science-and-safety#medical",
        "name": "Clinical Science and Safety of Wim Hof Breathwork",
        "url": "https://luma-breath.work/science-and-safety",
        "description": "Peer-reviewed analysis of autonomic nervous system activation, respiratory alkalosis, and safety contraindications."
      }
    ]
  },
  {
    path: '/apple-watch',
    title: 'Apple Watch Companion Breathwork App | Luma',
    description: 'Tactile wrist haptics breathwork companion paired with your iPhone. Custom Taptic pulses, Apple HealthKit mindful minutes sync, and zero ads.',
    priority: '0.8',
    changefreq: 'monthly',
    schemaEntities: [
      {
        "@type": "SoftwareApplication",
        "@id": "https://luma-breath.work/apple-watch#app",
        "name": "Luma for Apple Watch",
        "operatingSystem": "watchOS 10.0+",
        "applicationCategory": "HealthApplication",
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD"
        },
        "url": "https://apps.apple.com/us/app/luma-breathwork-meditation/id6737122722",
        "description": "Apple Watch companion breathwork timer with tailored haptic engine patterns paired with your iPhone and Apple Health integration."
      }
    ]
  },
  {
    path: '/faq',
    title: 'Wim Hof Breathwork FAQ: Technique & Safety | Luma',
    description: 'Frequently asked questions about Wim Hof breathing, tingling sensations, retention times, sound presets, Apple Watch integration, and free access.',
    priority: '0.7',
    changefreq: 'monthly',
    schemaEntities: [
      {
        "@type": "FAQPage",
        "@id": "https://luma-breath.work/faq#faq",
        "name": "Luma Breathwork Frequently Asked Questions",
        "url": "https://luma-breath.work/faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is Luma really 100% free with no subscriptions or ads?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Luma was created as an indie biohacking project born out of frustration with commercial apps charging $50–$80/year for simple breathing clocks. There are zero subscriptions, no hidden paywalls, no tracking, and no advertisements. All features, audio synthesizers, Apple Watch companion mode, and custom themes are unlocked forever."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use Luma on my Apple Watch?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Luma includes a dedicated Apple Watch companion app. It pairs directly with your iPhone to deliver tactile wrist haptics for every inhale, exhale, retention hold, and recovery breath so you can feel every breath pulse on your wrist while your session runs on iPhone."
            }
          },
          {
            "@type": "Question",
            "name": "Does Luma sync with Apple Health?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Luma automatically logs your Mindful Minutes and tracks active heart rate data during sessions directly into Apple Health (HealthKit)."
            }
          },
          {
            "@type": "Question",
            "name": "Can I practice in my web browser without installing anything?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Our full interactive Web Breathing Pacer is available directly at https://luma-breath.work/timer, complete with Tibetan bowl acoustic sounds and custom tempos."
            }
          },
          {
            "@type": "Question",
            "name": "Should I breathe through my nose or my mouth?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can breathe through either. Wim Hof recommends using whatever airway allows you to draw in the greatest volume of air smoothly. Many practitioners inhale deeply through the nose and release passively through relaxed lips."
            }
          },
          {
            "@type": "Question",
            "name": "Do I hold my breath on full lungs or empty lungs during the retention phase?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The main retention phase is performed on unforced empty lungs (after a relaxed, passive exhale). Once you feel the urge to breathe, you take one deep recovery breath in and hold on full lungs for 15 seconds."
            }
          },
          {
            "@type": "Question",
            "name": "How many rounds should I do each day?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A standard daily session consists of 3 to 4 rounds (each round having 30 to 40 power breaths followed by empty-lung retention and a 15-second recovery hold). The entire routine takes 12 to 15 minutes."
            }
          },
          {
            "@type": "Question",
            "name": "What is the best time of day to do Wim Hof breathing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The ideal time is first thing in the morning on an empty stomach, before consuming caffeine or breakfast. Doing breathwork on an empty stomach enhances diaphragm mobility and prevents digestive metabolic oxygen consumption."
            }
          },
          {
            "@type": "Question",
            "name": "Should I do breathwork before or after a cold shower?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Always perform your breathing session BEFORE taking a cold shower or ice bath. Never practice breath retention while standing under the cold water due to the risk of fainting (Shallow Water Blackout)."
            }
          },
          {
            "@type": "Question",
            "name": "Why do my hands, face, and lips tingle during breathing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tingling (paresthesia) is a natural result of respiratory alkalosis. Rapid power breathing expels large amounts of carbon dioxide (CO2), causing blood pH to rise. This temporarily lowers free ionized calcium in the blood, causing peripheral sensory nerves to tingle. It is completely harmless and subsides within 60 seconds after returning to normal breathing."
            }
          },
          {
            "@type": "Question",
            "name": "Why does my breath hold time get longer with each round?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your brainstem triggers the urge to breathe based on rising CO2 levels (blood acidity), not lack of oxygen. With each subsequent round, you blow off more baseline CO2 and enter deeper respiratory alkalosis, delaying the physiological 'air hunger' reflex."
            }
          },
          {
            "@type": "Question",
            "name": "Is it normal to hear ringing in the ears (tinnitus)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, temporary tinnitus or light auditory buzzing is common during deep hyperventilation due to acute shifts in blood pressure, alkalosis, and inner ear microcirculation. It typically resolves within minutes after the session."
            }
          },
          {
            "@type": "Question",
            "name": "Why is it dangerous to practice Wim Hof breathing in water?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Hyperventilation suppresses the CO2 trigger that warns your brain you need to breathe. In water, if oxygen drops below critical levels before CO2 rises, you can lose consciousness without warning (Shallow Water Blackout) and drown instantaneously. Never practice in pools, bathtubs, or open water."
            }
          },
          {
            "@type": "Question",
            "name": "Who should not practice the Wim Hof Method?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "People with epilepsy or a history of seizures, pregnant women, individuals with severe cardiovascular disease, aneurysms, kidney failure, or uncontrolled high blood pressure must avoid intense cyclic hyperventilation."
            }
          }
        ]
      }
    ]
  },
  {
    path: '/medical-disclaimer',
    title: 'Medical Disclaimer & Safety Guidelines | Luma Breathwork',
    description: 'Essential health disclaimers, contraindications (epilepsy, pregnancy, cardiovascular), and Shallow Water Blackout warnings for breathwork practitioners.',
    priority: '0.5',
    changefreq: 'yearly',
    schemaEntities: [
      {
        "@type": "MedicalWebPage",
        "@id": "https://luma-breath.work/medical-disclaimer#medical",
        "name": "Medical Disclaimer and Health Policy",
        "url": "https://luma-breath.work/medical-disclaimer",
        "description": "Health disclaimers, contraindications, and Shallow Water Blackout warnings for breathwork practitioners."
      }
    ]
  },
  {
    path: '/about',
    title: 'About Luma & Mission | Luma Team',
    description: 'The story behind Luma: an independent, ad-free biohacking project created to make breathwork timers 100% free and accessible to all.',
    priority: '0.6',
    changefreq: 'yearly',
    schemaEntities: [
      {
        "@type": "ProfilePage",
        "@id": "https://luma-breath.work/about#profile",
        "name": "About Luma & Project Mission",
        "url": "https://luma-breath.work/about",
        "mainEntity": {
          "@type": "Organization",
          "@id": "https://luma-breath.work/about#organization",
          "name": "Luma Team",
          "url": "https://luma-breath.work/about"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://luma-breath.work/about#team",
        "name": "Luma Team",
        "url": "https://luma-breath.work/about"
      }
    ]
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Luma Breathwork (Zero Data Collection)',
    description: 'Luma privacy policy: 100% offline-first design with zero data tracking, zero ads, no telemetry, and local Apple Health storage.',
    priority: '0.3',
    changefreq: 'yearly',
    schemaEntities: [
      {
        "@type": "WebPage",
        "@id": "https://luma-breath.work/privacy#webpage",
        "name": "Privacy Policy | Luma Breathwork",
        "description": "100% offline-first privacy policy with zero user tracking and local-only HealthKit storage.",
        "url": "https://luma-breath.work/privacy"
      }
    ]
  },
  {
    path: '/terms',
    title: 'Terms of Service | Luma Breathwork',
    description: 'Terms and conditions, liability waivers, and intellectual property notices for Luma breathwork web tools and iOS mobile applications.',
    priority: '0.3',
    changefreq: 'yearly',
    schemaEntities: [
      {
        "@type": "WebPage",
        "@id": "https://luma-breath.work/terms#webpage",
        "name": "Terms of Service | Luma Breathwork",
        "description": "Terms of service, liability disclaimer, and end-user agreements for Luma breathwork apps and web tools.",
        "url": "https://luma-breath.work/terms"
      }
    ]
  }
];

function generateSitemap() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  const publicSitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  for (const route of routes) {
    const loc = `https://luma-breath.work${route.path === '/' ? '/' : route.path}`;
    xml += `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq || 'monthly'}</changefreq>\n    <priority>${route.priority || '0.5'}</priority>\n  </url>\n`;
  }
  
  xml += `</urlset>\n`;
  fs.writeFileSync(sitemapPath, xml, 'utf-8');
  if (fs.existsSync(path.dirname(publicSitemapPath))) {
    fs.writeFileSync(publicSitemapPath, xml, 'utf-8');
  }
  console.log(` ✅ Sitemap generated at ${sitemapPath} (and public/sitemap.xml)`);
}

function buildBreadcrumbs(route: RouteMeta, allRoutes: RouteMeta[]): object | null {
  if (route.path === '/') return null;

  const itemListElement: object[] = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://luma-breath.work/"
    }
  ];

  const parts = route.path.split('/').filter(Boolean);
  let currentPath = '';
  let position = 2;

  for (let i = 0; i < parts.length; i++) {
    currentPath += `/${parts[i]}`;
    const matchingRoute = allRoutes.find(r => r.path === currentPath);
    
    // Only link to valid existing routes
    if (matchingRoute) {
      let name = parts[i]
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      if (matchingRoute.path === '/guide/wim-hof-method') {
        name = 'Wim Hof Method Guide';
      } else if (matchingRoute.path === '/timer') {
        name = 'Breathing Timer';
      } else if (matchingRoute.path === '/retention-times') {
        name = 'Retention Times';
      } else if (matchingRoute.path === '/science-and-safety') {
        name = 'Science & Safety';
      } else if (matchingRoute.path === '/apple-watch') {
        name = 'Apple Watch Companion';
      } else if (matchingRoute.path === '/faq') {
        name = 'FAQ';
      } else if (matchingRoute.path === '/about') {
        name = 'About';
      } else if (matchingRoute.path === '/medical-disclaimer') {
        name = 'Medical Disclaimer';
      } else if (matchingRoute.path === '/privacy') {
        name = 'Privacy Policy';
      } else if (matchingRoute.path === '/terms') {
        name = 'Terms of Service';
      }

      itemListElement.push({
        "@type": "ListItem",
        "position": position++,
        "name": name,
        "item": `https://luma-breath.work${matchingRoute.path}`
      });
    }
  }

  // Fallback if no matching subsegment was resolved (ensure current route is present)
  if (itemListElement.length === 1) {
    itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": route.title.split('|')[0].trim(),
      "item": `https://luma-breath.work${route.path}`
    });
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `https://luma-breath.work${route.path}#breadcrumb`,
    "itemListElement": itemListElement
  };
}

function prerender() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/index.html not found. Run "vite build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');

  console.log('🚀 Starting Static Site Generation (SSG) Pre-rendering for all 11 routes...');

  for (const route of routes) {
    let html = baseHtml;

    // 1. Replace Title & Meta Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
    html = html.replace(/<meta\s+name=["']title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="title" content="${route.title}" />`);
    html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${route.title}" />`);
    html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${route.title}" />`);

    // 2. Replace Description
    html = html.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${route.description}" />`);
    html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${route.description}" />`);
    html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${route.description}" />`);

    // 3. Canonical & Open Graph URL
    const canonicalUrl = `https://luma-breath.work${route.path === '/' ? '/' : route.path}`;
    html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
    html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
    html = html.replace(/<meta\s+name=["']twitter:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:url" content="${canonicalUrl}" />`);

    // 4. Ensure Robots tag exists
    if (!html.includes('name="robots"')) {
      html = html.replace(/<head>/i, '<head>\n    <meta name="robots" content="index, follow" />');
    }

    // 5. Ensure OG Image Dimensions & Alt
    if (!html.includes('property="og:image:width"')) {
      html = html.replace(
        /(<meta property="og:image" content=".*?" \/>)/i,
        '$1\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />\n    <meta property="og:image:alt" content="Luma Breathwork &amp; Wim Hof Retention Timer App" />'
      );
    }

    // 6. Schema.org JSON-LD Graph Construction
    const graphEntities: object[] = [];

    if (route.schemaEntities && route.schemaEntities.length > 0) {
      graphEntities.push(...route.schemaEntities);
    } else if (route.path !== '/') {
      graphEntities.push({
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "name": route.title,
        "description": route.description,
        "url": canonicalUrl
      });
    }

    // Add BreadcrumbList schema for all subpages
    const breadcrumbs = buildBreadcrumbs(route, routes);
    if (breadcrumbs) {
      graphEntities.push(breadcrumbs);
    }

    const schemaGraph = {
      "@context": "https://schema.org",
      "@graph": graphEntities
    };

    const schemaScript = `<script type="application/ld+json">\n    ${JSON.stringify(schemaGraph, null, 2)}\n    </script>`;
    if (html.includes('<script type="application/ld+json">')) {
      html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, schemaScript);
    } else {
      html = html.replace('</head>', `${schemaScript}\n  </head>`);
    }

    // 7. Render React Component Tree to Static HTML (SSR / SSG)
    const appHtml = renderToString(React.createElement(App, { initialPath: route.path }));
    html = html.replace(/<div\s+id=["']root["'][^>]*>[\s\S]*?<\/div>/i, `<div id="root">${appHtml}</div>`);

    // 8. Write Static HTML Output
    const targetDir = route.path === '/' ? distDir : path.join(distDir, route.path.replace(/^\//, ''));
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, html, 'utf-8');
    console.log(` ✅ Pre-rendered: ${route.path} -> ${path.relative(process.cwd(), targetFile)} (${appHtml.length} chars SSR HTML)`);
  }

  generateSitemap();
  console.log('🎉 Static Pre-rendering completed successfully for all 11 routes!');
}

prerender();

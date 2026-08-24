import fs from 'fs';
import path from 'path';

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  schema?: object;
}

const routes: RouteMeta[] = [
  {
    path: '/',
    title: 'Luma — Free Breathwork App & Online Guided Retention Timer',
    description: 'The #1 free breathwork app & online guided timer. Compatible with Wim Hof Method 30-40 power breaths, retention stopwatch, Apple Watch haptics & zero ads.',
  },
  {
    path: '/timer',
    title: 'Free Wim Hof Breathing Timer Online & Retention Stopwatch | Luma',
    description: 'Free interactive online Wim Hof Method breathing pacer and retention stopwatch. 30-40 power breaths, Tibetan bowl sound chimes, recovery hold countdown in your browser.',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
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
  },
  {
    path: '/guide/wim-hof-method',
    title: 'How to Do Wim Hof Method Breathing: Step-by-Step Guide | Luma',
    description: 'Master the Wim Hof breathing technique. Comprehensive 5-step guide covering cyclic hyperventilation, empty-lung retention, recovery holds, physiology, and safety.',
    schema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Practice Wim Hof Method Breathing",
      "description": "Step-by-step instructions to perform cyclic hyperventilation and breath retention safely.",
      "totalTime": "PT15M",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Get into a Safe, Comfortable Position",
          "text": "Sit or lie down in a safe environment. Never practice in water or while driving."
        },
        {
          "@type": "HowToStep",
          "name": "30 to 40 Deep Power Breaths",
          "text": "Inhale deeply into belly and chest, then let go passively without forcing the exhale."
        },
        {
          "@type": "HowToStep",
          "name": "Empty Lung Retention Hold",
          "text": "Exhale unforced after the final breath and hold on empty lungs until the urge to breathe arises."
        },
        {
          "@type": "HowToStep",
          "name": "15-Second Recovery Inhale",
          "text": "Inhale to maximum capacity and hold full for 15 seconds."
        },
        {
          "@type": "HowToStep",
          "name": "Repeat for 3-4 Rounds",
          "text": "Complete 3 to 4 rounds for optimal autonomic and immune benefits."
        }
      ]
    }
  },
  {
    path: '/retention-times',
    title: 'Wim Hof Retention Times: Averages, Benchmarks & Physiology | Luma',
    description: 'What is a normal Wim Hof retention time? Comprehensive round-by-round averages (Rounds 1-4), CO2 physiology, and why your breath hold expands naturally.',
    schema: {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": "Wim Hof Retention Times: Benchmarks and Physiology",
      "url": "https://luma-breath.work/retention-times",
      "description": "Round 1 to 4 retention benchmarks, hypocapnia, and oxygen-hemoglobin dissociation mechanics."
    }
  },
  {
    path: '/science-and-safety',
    title: 'The Science & Safety of Wim Hof Breathwork: Clinical Research | Luma',
    description: 'Scientific analysis of Radboud University clinical trials (Kox et al.), respiratory alkalosis, adrenaline surges, and vital Shallow Water Blackout prevention.',
    schema: {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": "Clinical Science and Safety of Wim Hof Breathwork",
      "url": "https://luma-breath.work/science-and-safety",
      "description": "Peer-reviewed analysis of autonomic nervous system activation, respiratory alkalosis, and safety contraindications."
    }
  },
  {
    path: '/apple-watch',
    title: 'Apple Watch Companion Breathwork App | Luma',
    description: 'Tactile wrist haptics breathwork companion paired with your iPhone. Custom Taptic pulses, Apple HealthKit mindful minutes sync, and zero ads.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
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
  },
  {
    path: '/faq',
    title: 'Wim Hof Breathwork FAQ: Technique, Tingling & Safety | Luma',
    description: 'Frequently asked questions about Wim Hof breathing, tingling sensations, retention times, sound presets, Apple Watch integration, and free access.',
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": "Luma Breathwork Frequently Asked Questions",
      "url": "https://luma-breath.work/faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is Luma really 100% free with no subscriptions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Luma has zero paywalls, zero ads, and zero locked features. All visual themes, Tibetan singing bowl acoustics, and Apple Watch companion features are completely free forever."
          }
        },
        {
          "@type": "Question",
          "name": "Why do my hands and face tingle during breathing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tingling (paresthesia) is caused by respiratory alkalosis. As rapid deep breathing blows off CO2, your blood pH rises, causing temporary harmless nerve excitability in your extremities."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use Luma on Apple Watch?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Luma includes an Apple Watch companion app with custom haptic vibration pulses paired with your iPhone, feeling every breath pulse on your wrist while your session runs."
          }
        }
      ]
    }
  },
  {
    path: '/medical-disclaimer',
    title: 'Medical Disclaimer & Safety Guidelines | Luma Breathwork',
    description: 'Essential health disclaimers, contraindications (epilepsy, pregnancy, cardiovascular), and Shallow Water Blackout warnings for breathwork practitioners.',
    schema: {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": "Medical Disclaimer and Health Policy",
      "url": "https://luma-breath.work/medical-disclaimer",
      "description": "Health disclaimers, contraindications, and Shallow Water Blackout warnings for breathwork practitioners."
    }
  },
  {
    path: '/about',
    title: 'About Luma & Mission | Luma Team',
    description: 'The story behind Luma: an independent, ad-free biohacking project created to make breathwork timers 100% free and accessible to all.',
    schema: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "name": "About Luma & Project Mission",
      "mainEntity": {
        "@type": "Organization",
        "name": "Luma Team",
        "url": "https://luma-breath.work/about"
      }
    }
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Luma Breathwork (Zero Data Collection)',
    description: 'Luma privacy policy: 100% offline-first design with zero data tracking, zero ads, and local Apple Health storage.',
  },
  {
    path: '/terms',
    title: 'Terms of Service | Luma Breathwork',
    description: 'Terms and conditions, liability waivers, and intellectual property notices for Luma web tools and mobile apps.',
  }
];

function prerender() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/index.html not found. Run "vite build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');

  console.log('🚀 Starting Static Site Generation (SSG) Pre-rendering for all routes...');

  for (const route of routes) {
    let html = baseHtml;

    // Replace Title
    html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
    html = html.replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${route.title}" />`);
    html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${route.title}" />`);
    html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${route.title}" />`);

    // Replace Description
    html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.description}" />`);
    html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${route.description}" />`);
    html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${route.description}" />`);

    // Canonical & OG URL
    const canonicalUrl = `https://luma-breath.work${route.path === '/' ? '/' : route.path}`;
    html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
    html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);
    html = html.replace(/<meta name="twitter:url" content=".*?" \/>/, `<meta name="twitter:url" content="${canonicalUrl}" />`);

    // Replace Schema on subpages
    if (route.path !== '/') {
      if (route.schema) {
        const schemaScript = `<script type="application/ld+json">\n    ${JSON.stringify(route.schema, null, 2)}\n    </script>`;
        html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schemaScript);
      } else {
        const basicSchema = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": route.title,
          "description": route.description,
          "url": canonicalUrl
        };
        const schemaScript = `<script type="application/ld+json">\n    ${JSON.stringify(basicSchema, null, 2)}\n    </script>`;
        html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schemaScript);
      }
    }

    // Write file
    const targetDir = route.path === '/' ? distDir : path.join(distDir, route.path.replace(/^\//, ''));
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, html, 'utf-8');
    console.log(` ✅ Pre-rendered: ${route.path} -> ${path.relative(process.cwd(), targetFile)}`);
  }

  console.log('🎉 Static Pre-rendering completed successfully for all 11 routes!');
}

prerender();

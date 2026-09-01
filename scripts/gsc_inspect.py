import json
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']
creds = Credentials.from_authorized_user_file('gsc_token.json', SCOPES)
service = build('searchconsole', 'v1', credentials=creds)

site_url = 'sc-domain:luma-breath.work'
urls = [
    'https://luma-breath.work/',
    'https://luma-breath.work/timer',
    'https://luma-breath.work/guide/wim-hof-method',
    'https://luma-breath.work/retention-times',
    'https://luma-breath.work/science-and-safety',
    'https://luma-breath.work/apple-watch',
    'https://luma-breath.work/faq',
    'https://luma-breath.work/about',
    'https://luma-breath.work/medical-disclaimer',
    'https://luma-breath.work/privacy',
    'https://luma-breath.work/terms'
]

results = []
print("--- URL Inspection via GSC API ---", flush=True)
for url in urls:
    try:
        req_body = {
            'inspectionUrl': url,
            'siteUrl': site_url
        }
        res = service.urlInspection().index().inspect(body=req_body).execute()
        idx_res = res.get('inspectionResult', {}).get('indexStatusResult', {})
        verdict = idx_res.get('verdict', 'UNKNOWN')
        coverage_state = idx_res.get('coverageState', 'UNKNOWN')
        crawled_as = idx_res.get('crawledAs', 'UNKNOWN')
        last_crawl_time = idx_res.get('lastCrawlTime', 'Never')
        page_fetch_state = idx_res.get('pageFetchState', 'UNKNOWN')
        robots_txt = idx_res.get('robotsTxtState', 'UNKNOWN')
        indexing_state = idx_res.get('indexingState', 'UNKNOWN')
        user_canonical = idx_res.get('userCanonical', 'None')
        google_canonical = idx_res.get('googleCanonical', 'None')

        print(f"\nURL: {url}", flush=True)
        print(f"  Verdict: {verdict} | State: {coverage_state}", flush=True)
        print(f"  Last Crawl: {last_crawl_time} | Crawled As: {crawled_as}", flush=True)
        print(f"  Google Canonical: {google_canonical}", flush=True)

        results.append({
            'url': url,
            'verdict': verdict,
            'coverageState': coverage_state,
            'lastCrawlTime': last_crawl_time,
            'userCanonical': user_canonical,
            'googleCanonical': google_canonical,
            'raw': idx_res
        })
    except Exception as e:
        print(f"Error inspecting {url}: {e}", flush=True)

with open('scratch/url_inspection_report.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)

print("\nSaved inspection results to scratch/url_inspection_report.json", flush=True)

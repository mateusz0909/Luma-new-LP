import os
import sys
import json
from datetime import datetime, timedelta

sys.stdout.reconfigure(line_buffering=True)
sys.stderr.reconfigure(line_buffering=True)

from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

SCOPES = [
    'https://www.googleapis.com/auth/webmasters.readonly',
]

def get_credentials():
    creds = None
    token_file = 'gsc_token.json'
    client_secret_file = 'client_secrets.json'

    if not os.path.exists(client_secret_file):
        print(f"Error: {client_secret_file} not found.", file=sys.stderr, flush=True)
        sys.exit(1)

    if os.path.exists(token_file):
        try:
            creds = Credentials.from_authorized_user_file(token_file, SCOPES)
            print("Loaded existing token from gsc_token.json", flush=True)
        except Exception as e:
            print(f"Token load warning: {e}", file=sys.stderr, flush=True)
            creds = None

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                print("Refreshing expired token...", flush=True)
                creds.refresh(Request())
            except Exception as e:
                print(f"Refresh failed: {e}", flush=True)
                creds = None
        if not creds:
            print("Starting OAuth flow...", flush=True)
            flow = InstalledAppFlow.from_client_secrets_file(client_secret_file, SCOPES)
            creds = flow.run_local_server(port=0, prompt='consent', open_browser=True)
            with open(token_file, 'w') as f:
                f.write(creds.to_json())
            print(f"Successfully authenticated and saved token to {token_file}", flush=True)

    return creds

def main():
    print("Connecting to Google Search Console API...", flush=True)
    creds = get_credentials()
    service = build('searchconsole', 'v1', credentials=creds)

    print("Fetching verified sites/properties...", flush=True)
    sites_res = service.sites().list().execute()
    sites = sites_res.get('siteEntry', [])
    print(f"\n=== Found {len(sites)} properties ===", flush=True)
    for s in sites:
        print(f" - {s.get('siteUrl')} (Permission: {s.get('permissionLevel')})", flush=True)

    if not sites:
        print("No verified sites found for this Google account.", flush=True)
        return

    # Find luma site or pick the first matching
    target_site = None
    for s in sites:
        url = s.get('siteUrl', '')
        if 'luma' in url.lower():
            target_site = url
            break
    if not target_site:
        target_site = sites[0].get('siteUrl')

    print(f"\n==========================================", flush=True)
    print(f"Analyzing target property: {target_site}", flush=True)
    print(f"==========================================", flush=True)

    # Check Sitemaps
    try:
        sitemaps_res = service.sitemaps().list(siteUrl=target_site).execute()
        sitemaps = sitemaps_res.get('sitemap', [])
        print(f"\n--- Sitemaps Status ({len(sitemaps)}) ---", flush=True)
        for sm in sitemaps:
            print(f" Path: {sm.get('path')}", flush=True)
            print(f"  Last submitted: {sm.get('lastSubmitted')}, Last downloaded: {sm.get('lastDownloaded')}", flush=True)
            print(f"  Warnings: {sm.get('warnings')}, Errors: {sm.get('errors')}", flush=True)
            for c in sm.get('contents', []):
                print(f"  Type: {c.get('type')}, Submitted: {c.get('submitted')}, Indexed: {c.get('indexed')}", flush=True)
    except Exception as e:
        print(f"Sitemaps check error: {e}", flush=True)

    today = datetime.utcnow().date()
    end_date = (today - timedelta(days=3)).strftime('%Y-%m-%d')
    start_date = (today - timedelta(days=93)).strftime('%Y-%m-%d')

    print(f"\n--- Search Analytics (Last 90 Days: {start_date} to {end_date}) ---", flush=True)

    try:
        overview_body = {
            'startDate': start_date,
            'endDate': end_date,
            'dimensions': ['date']
        }
        overview_res = service.searchanalytics().query(siteUrl=target_site, body=overview_body).execute()
        rows = overview_res.get('rows', [])
        total_clicks = sum(r.get('clicks', 0) for r in rows)
        total_impressions = sum(r.get('impressions', 0) for r in rows)
        avg_ctr = (total_clicks / total_impressions * 100) if total_impressions > 0 else 0
        avg_pos = (sum(r.get('position', 0) * r.get('impressions', 0) for r in rows) / total_impressions) if total_impressions > 0 else 0
        print(f"Total Clicks: {total_clicks}", flush=True)
        print(f"Total Impressions: {total_impressions}", flush=True)
        print(f"Average CTR: {avg_ctr:.2f}%", flush=True)
        print(f"Average Position: {avg_pos:.2f}", flush=True)
    except Exception as e:
        print(f"Overview query error: {e}", flush=True)

    top_queries = []
    try:
        queries_body = {
            'startDate': start_date,
            'endDate': end_date,
            'dimensions': ['query'],
            'rowLimit': 100
        }
        queries_res = service.searchanalytics().query(siteUrl=target_site, body=queries_body).execute()
        top_queries = queries_res.get('rows', [])
        print(f"\n--- Top Queries ({len(top_queries)}) ---", flush=True)
        for q in top_queries:
            query_str = q.get('keys', [''])[0]
            clicks = q.get('clicks', 0)
            imp = q.get('impressions', 0)
            ctr = q.get('ctr', 0) * 100
            pos = q.get('position', 0)
            print(f" - \"{query_str}\": Clicks={clicks}, Impressions={imp}, CTR={ctr:.1f}%, AvgPos={pos:.1f}", flush=True)
    except Exception as e:
        print(f"Queries query error: {e}", flush=True)

    top_pages = []
    try:
        pages_body = {
            'startDate': start_date,
            'endDate': end_date,
            'dimensions': ['page'],
            'rowLimit': 50
        }
        pages_res = service.searchanalytics().query(siteUrl=target_site, body=pages_body).execute()
        top_pages = pages_res.get('rows', [])
        print(f"\n--- Top Pages ({len(top_pages)}) ---", flush=True)
        for p in top_pages:
            page_str = p.get('keys', [''])[0]
            clicks = p.get('clicks', 0)
            imp = p.get('impressions', 0)
            ctr = p.get('ctr', 0) * 100
            pos = p.get('position', 0)
            print(f" - {page_str}: Clicks={clicks}, Impressions={imp}, CTR={ctr:.1f}%, AvgPos={pos:.1f}", flush=True)
    except Exception as e:
        print(f"Pages query error: {e}", flush=True)

    report_data = {
        'target_site': target_site,
        'start_date': start_date,
        'end_date': end_date,
        'properties': sites,
        'sitemaps': sitemaps if 'sitemaps' in locals() else [],
        'top_queries': top_queries,
        'top_pages': top_pages
    }
    os.makedirs('scratch', exist_ok=True)
    with open('scratch/gsc_report.json', 'w', encoding='utf-8') as f:
        json.dump(report_data, f, indent=2, ensure_ascii=False)
    print("\n[SUCCESS] Full GSC Report saved to scratch/gsc_report.json", flush=True)

if __name__ == '__main__':
    main()

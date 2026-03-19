import postgres from 'postgres';
import Script from 'next/script';
import fs from 'fs';
import path from 'path';

export default async function Home() {
  // 1. Fetch data from Neon Database to prove connection
  let dbStatus = "Neon DB Loading...";
  try {
    const connectionString = process.env.DATABASE_URL;
    if (connectionString) {
      const sql = postgres(connectionString, { ssl: 'require' });
      const result = await sql`SELECT NOW()`;
      dbStatus = `🟢 Neon DB Active (Server Time: ${result[0].now.toISOString()})`;
    } else {
      dbStatus = `🔴 Neon DB Not Connected (DATABASE_URL missing)`;
    }
  } catch (error: any) {
    dbStatus = `🔴 Neon DB Error: ${error.message}`;
  }

  // 2. Read the original index.html from public folder to perfectly preserve all links and formatting
  const htmlPath = path.join(process.cwd(), 'public', 'index.html');
  let content = fs.readFileSync(htmlPath, 'utf8');
  
  // Extract script block so we can run it cleanly in Next.js
  const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
  const scriptContent = scriptMatch ? scriptMatch[1] : '';
  
  // Extract body content without the script block to prevent React hydration stripping
  let bodyContent = content.match(/<body>([\s\S]*?)<script>/)?.[1] || '';
  if (!bodyContent) {
     // fallback if regex misses
     bodyContent = content.match(/<body>([\s\S]*?)<\/body>/)?.[1] || '';
  }
  
  // 3. Inject the DB connection status directly into the HTML's top bar!
  bodyContent = bodyContent.replace(
    '<div class="header-top-bar">',
    `<div class="header-top-bar">\n<div class="container" style="text-align:center; color: #E91E63; font-weight: 900; font-size: 14px; padding: 5px 0;">${dbStatus}</div>`
  );

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
      <Script id="original-home-script" strategy="lazyOnload">
        {scriptContent}
      </Script>
    </>
  );
}

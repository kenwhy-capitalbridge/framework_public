# Fix 404 on platform.thecapitalbridge.com

Your app works at: `advisoryplatform-git-main-kenwhy-capitalbridges-projects.vercel.app`  
404 only on: `platform.thecapitalbridge.com`

So the **custom domain is not pointing at this project’s deployment.**

## Fix in Vercel

1. **Open the project that works**  
   Go to the deployment that shows “Platform Alive”:  
   `advisoryplatform-git-main-kenwhy-capitalbridges-projects.vercel.app`  
   Click through to the **advisoryplatform** project.

2. **Add the custom domain to this project**  
   - In that project: **Settings → Domains** (or **Domains** in the top nav).  
   - Click **Add** and enter: `platform.thecapitalbridge.com`  
   - Save.  
   - If Vercel says the domain is already used by another project, **remove it from the other project first**, then add it here.

3. **DNS**  
   - If Vercel shows DNS records (CNAME or A), make sure your DNS for `platform.thecapitalbridge.com` matches (CNAME to `cname.vercel-dns.com` or the value Vercel shows).  
   - Wait a few minutes for DNS to propagate.

4. **Test**  
   Visit `https://platform.thecapitalbridge.com` again (hard refresh or incognito). It should serve the same deployment as the `.vercel.app` URL.

## If the domain is already on another project

- That other project is what gets traffic for `platform.thecapitalbridge.com`.  
- Either: **remove** the domain from that project and **add** it to **advisoryplatform**,  
- Or: deploy the same code from that project (same repo/branch) so that project’s deployment is up to date.

The 404 will stop once `platform.thecapitalbridge.com` is assigned to the project whose deployment shows “Platform Alive”.

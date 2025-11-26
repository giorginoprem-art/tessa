# Panduan Fix: Gambar Tidak Muncul di GitHub Pages

## Diagnosis Masalah

Gambar muncul di localhost tetapi tidak di GitHub Pages, kemungkinan penyebabnya:

1. **GitHub Pages menggunakan base path** - Jika repo name bukan `giorginoprem-art.github.io`, maka Pages URL = `https://username.github.io/tessa/`
2. **Next.js standalone mode tidak serve static files** - Perlu konfigurasi khusus
3. **Build output tidak include public folder** - File belum di-copy ke output

---

## Solusi Sesuai Setup Anda

### **Langkah 1: Tentukan URL GitHub Pages Anda**

**Cek di GitHub Settings:**
1. Buka: https://github.com/giorginoprem-art/tessa/settings/pages
2. Lihat "GitHub Pages" section
3. Catat URL yang ditampilkan

**Kemungkinan URL Anda:**
- Opsi A: `https://giorginoprem-art.github.io/tessa/` ← Path-based (Repo name)
- Opsi B: `https://giorginoprem-art.github.io/` ← User pages (jika repo bernama `giorginoprem-art.github.io`)

---

### **Langkah 2: Update Konfigurasi Berdasarkan URL**

#### **Jika URL = `https://giorginoprem-art.github.io/tessa/` (Path-based)**

Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: "/tessa", // ← TAMBAHKAN INI
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "gior-bali-tour.com",
          },
        ],
        destination: "https://giorbalitour.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

#### **Jika URL = `https://giorginoprem-art.github.io/` (User pages)**

Tidak perlu ubah, gunakan config yang ada.

---

### **Langkah 3: Rebuild & Test**

```bash
# 1. Clear next build cache
rm -rf .next

# 2. Rebuild
npm run build

# 3. Test local build
npm run start

# 4. Buka http://localhost:3000
# (atau http://localhost:3000/tessa jika pakai basePath)
```

---

### **Langkah 4: Pastikan Public Folder di-Copy ke Build Output**

Karena menggunakan `output: "standalone"`, perlu pastikan public folder di-copy. Cek `build` script di `package.json`:

```json
{
  "scripts": {
    "build": "next build && cp -r public .next/standalone/public && cp -r .next/static .next/standalone/.next/",
    "start": "NODE_ENV=production node .next/standalone/server.js"
  }
}
```

Seharusnya sudah ada di kode Anda.

---

### **Langkah 5: Deploy ke GitHub Pages**

#### **Opsi A: Gunakan GitHub Actions (Recommended)**

Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

#### **Opsi B: Manual Deploy**

```bash
# 1. Build
npm run build

# 2. Create gh-pages branch
git checkout --orphan gh-pages

# 3. Copy build output
cp -r .next/standalone/* .

# 4. Commit & push
git add .
git commit -m "Deploy to GitHub Pages"
git push -u origin gh-pages -f
```

---

## Verifikasi di Browser

**Buka DevTools (F12) → Console:**

Ketikkan:
```javascript
console.log(location.href)
// Lihat URL yang aktif
```

Kemudian cek:
1. Gambar di inspect element - lihat src attribute-nya
2. Network tab - lihat request URL untuk gambar
3. Console - lihat ada error 404?

---

## Checklist Troubleshooting

- [ ] GitHub Pages sudah enabled di Settings
- [ ] Build script include copy public folder
- [ ] next.config.ts sudah benar (dengan atau tanpa basePath)
- [ ] Folder `public/images/` ada di repository
- [ ] Jalankan `npm run build` local dan test dengan `npm run start`
- [ ] Deploy dengan GitHub Actions atau manual push
- [ ] Check browser DevTools untuk error 404

---

## Quick Test Command

```bash
# Test build output
npm run build && \
echo "✅ Build selesai" && \
ls -la public/images/ && \
echo "Verifikasi selesai"
```

Silakan lakukan langkah-langkah di atas dan report hasilnya! 🚀

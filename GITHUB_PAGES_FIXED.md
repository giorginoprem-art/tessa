# ✅ Fix untuk GitHub Pages - Gambar Muncul

## Perubahan yang Sudah Dibuat

### 1. **next.config.ts**
- Changed from `output: "standalone"` → `output: "export"` (untuk static export ke GitHub Pages)
- Added `basePath: "/tessa"` (untuk URL `https://giorginoprem-art.github.io/tessa/`)
- Added `images: { unoptimized: true }` (untuk disable image optimization)

### 2. **.github/workflows/nextjs.yml**
- Updated workflow untuk copy public folder ke output
- Added step untuk export static site

---

## Langkah Selanjutnya

### 1. **Commit & Push Perubahan**

```bash
cd /workspaces/tessa

git add next.config.ts .github/workflows/nextjs.yml

git commit -m "Fix: Configure for GitHub Pages static export with basePath /tessa"

git push origin main
```

### 2. **Trigger GitHub Actions**

Setelah push, workflow akan otomatis berjalan:
- Buka: https://github.com/giorginoprem-art/tessa/actions
- Tunggu hingga "Deploy Next.js site to Pages" selesai (✅ green)

### 3. **Test di GitHub Pages**

Buka: https://giorginoprem-art.github.io/tessa/

Periksa:
- ✅ Hero section - carousel gambar muncul?
- ✅ Cars section - semua mobil gambar muncul?
- ✅ About section - carousel gambar muncul?
- ✅ Tidak ada console errors (F12)

---

## Local Test (Optional)

```bash
# 1. Build untuk production
npm run build

# 2. Cek output folder dibuat
ls -la out/

# 3. Test dengan local server (simulasi GitHub Pages)
cd out
python3 -m http.server 8000

# 4. Buka browser: http://localhost:8000/tessa/
```

---

## Jika Masih Ada Masalah

1. **Cek console browser (F12)** - lihat error apa
2. **Lihat Actions workflow** - lihat build success/fail
3. **Cek public folder** - pastikan ada di repository
   ```bash
   git ls-files | grep "public/images"
   ```

---

## Nanti Ketika Gunakan Custom Domain

Ketika sudah punya custom domain (misal: `www.giorbali.com`):
1. Hapus `basePath: "/tessa"` dari next.config.ts
2. Update GitHub Pages settings ke custom domain
3. Redeploy

Saat itu tidak perlu basePath lagi.

---

**Status:** ✅ Ready untuk push dan deploy!

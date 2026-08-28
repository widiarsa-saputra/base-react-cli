# Base React CLI Generator

## Quick Use
```bash
gotra make:module
```

## Quick Install
```bash
npx github:username/base-react-cli make:module
```
or
```
npm install -g github:widiarsa-saputra/base-react-cli
```

CLI Scaffolding tool internal untuk standardisasi dan otomasi pembuatan modul feature (UI), service layer (TanStack Query + Zod), serta auto-inject routing pada arsitektur Base React Vite.

---

## Fitur Utama

- 🚀 **Standardized UI Layer**: Otomatis membuat komponen Page, DataPageTemplate Table, Form Mutation, dan Delete Confirmation Dialog.
- ⚡ **Type-Safe Data Layer**: Menghasilkan TanStack Query CRUD hooks, validasi skema Zod, dan DTO interfaces.
- 🔗 **Auto Route Injection**: Langsung mendaftarkan baris `import` dan deklarasi route di `src/router/AppRouter.tsx`.
- 📦 **Zero-Config Distribution**: Dapat dijalankan langsung via `npx` tanpa perlu clone repo secara manual.

---

## Struktur File yang Digenerate

Menjalankan perintah untuk modul (misal: `student` / `students`) akan menghasilkan struktur berikut:

```text
src/
├── features/
│   └── student/
│       ├── components/
│       │   ├── RemoveStudent.tsx
│       │   ├── StudentMainContent.tsx
│       │   └── StudentMutationForm.tsx
│       └── pages/
│           └── StudentPage.tsx
│
├── services/
│   └── students/
│       ├── hooks/
│       │   └── useStudentCRUD.ts
│       ├── response/
│       │   └── StudentResponse.ts
│       └── schema/
│           └── StudentSchema.ts
│
└── router/
    └── AppRouter.tsx   # Otomatis ditambahkan route: /students

## Cara Penggunaan

### Metode 1: Eksekusi Langsung via NPX (Rekomendasi Tim)

Buka terminal pada root project React Anda, lalu jalankan:

```bash
npx github:username/base_react_cli make:module

```

**Catatan**: Ganti username/base_react_cli dengan username/organisasi dan nama repository GitHub Anda.

### Metode 2: Setup Lokal (Development CLI)

Jika ingin mengembangkan atau memodifikasi template generator di mesin lokal:

**Clone repository**:

```bash
git clone [https://github.com/username/base_react_cli.git](https://github.com/username/base_react_cli.git)
cd base_react_cli
```

**Install dependency & build**:

```bash
npm install
npm run build
```

**Link secara global**:

```bash
npm link
```

**Jalankan di project React mana pun**:

```bash
cd path/to/base_react
gotra make:module
```

### Panduan Interaktif CLI

Saat perintah `make:module` dijalankan, terminal akan meminta dua input:

- **Nama Modul (Singular)**: Nama entitas tunggal dalam format kata dasar (contoh: `student`, `product`, `teacher`).
- **Nama Modul (Plural)**: Nama bentuk jamak untuk path API endpoint, URL route, dan folder services (contoh: `students`, `products`, `teachers`).

### Development Scripts (Repo CLI)

- **`npm run dev`**: Build TypeScript dalam mode watch.
- **`npm run build`**: Build bundle executable ke folder `dist/` dan menyalin template Handlebars.

Development Scripts (Repo CLI)
- `npm run dev`: Build TypeScript dalam mode watch.

- `npm run build`: Build bundle executable ke folder dist/ dan menyalin template Handlebars.
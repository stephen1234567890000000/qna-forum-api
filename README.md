# QnA Forum API

## Deskripsi Project

QnA Forum API adalah RESTful API untuk aplikasi forum tanya jawab sederhana. Aplikasi ini memungkinkan user untuk melakukan registrasi, login, melihat profil, membuat pertanyaan, melihat daftar pertanyaan, serta mengelola pertanyaan miliknya sendiri.

API ini dibuat sebagai solusi untuk code challenge dengan fokus pada autentikasi, authorization, validasi input, error handling, dan relasi data antara user dan thread.

## Fitur Utama

### 1. User Registration

User dapat membuat akun baru dengan mengirimkan username, email, dan password. Password tidak disimpan dalam bentuk asli, melainkan di-hash menggunakan `bcryptjs` sebelum disimpan ke database.

**Endpoint:** `POST /api/auth/register`

**Dokumentasi / Screenshot:**

<!-- Tempel screenshot Swagger UI untuk endpoint register di bawah ini. -->

![Register endpoint](![alt text](image.png) ![alt text](image-1.png))

**Contoh request:**

```json
{
	"username": "johndoe",
	"email": "johndoe@example.com",
	"password": "secret123"
}
```

**Expected response:** `201 Created`

Response berisi pesan sukses, data user publik, dan token JWT.

**Contoh error yang perlu didokumentasikan:**

- `400 Bad Request` jika field kosong atau format email tidak valid.
- `400 Bad Request` jika email sudah terdaftar.

![Register validation error](![alt text](image-2.png) ![alt text](image-3.png))

### 2. User Login and JWT Authentication

User yang sudah terdaftar dapat login menggunakan email dan password. Jika kredensial benar, API akan mengembalikan token JWT yang digunakan untuk mengakses endpoint yang membutuhkan autentikasi.

**Endpoint:** `POST /api/auth/login`

**Dokumentasi / Screenshot:**

![Login endpoint](![alt text](image-4.png) ![alt text](image-5.png))

**Contoh request:**

```json
{
	"email": "johndoe@example.com",
	"password": "secret123"
}
```

**Expected response:** `200 OK`

**Contoh error yang perlu didokumentasikan:**

- `400 Bad Request` jika email atau password tidak valid.
- `401 Unauthorized` jika email atau password salah.

![Login unauthorized error](![alt text](image-6.png) ![alt text](image-7.png))

### 3. Public User Profile

Endpoint ini digunakan untuk melihat profil publik user berdasarkan ID. Data password atau password hash tidak pernah dikembalikan dalam response.

**Endpoint:** `GET /api/users/:id`

**Dokumentasi / Screenshot:**

![User profile endpoint](![alt text](image-8.png) ![alt text](image-9.png))

**Expected response:** `200 OK`

Response berisi ID, username, email, dan waktu pembuatan akun.

**Contoh error:** `404 Not Found` jika user dengan ID tersebut tidak ditemukan.

![User profile not found](![alt text](image-10.png) ![alt text](image-11.png))

### 4. Create Discussion Thread

User yang sudah login dapat membuat thread atau pertanyaan baru. User ID diambil dari token JWT sehingga user tidak dapat membuat thread atas nama user lain.

**Endpoint:** `POST /api/threads`

**Authentication:** Required

```text
Authorization: Bearer <JWT_TOKEN>
```

**Dokumentasi / Screenshot:**

![Create thread endpoint](![alt text](image-12.png) ![alt text](image-13.png))

**Contoh request:**

```json
{
	"title": "How do I use environment variables in Node.js?",
	"content": "I need help configuring environment variables in my application."
}
```

**Expected response:** `201 Created`

**Contoh error yang perlu didokumentasikan:**

- `400 Bad Request` jika title atau content kosong.
- `401 Unauthorized` jika token tidak dikirim atau token tidak valid.

![Create thread unauthorized](![alt text](image-14.png) ![alt text](image-15.png) ![alt text](image-16.png) ![alt text](image-17.png))

### 5. Get All Threads

Endpoint publik untuk mengambil seluruh thread dari semua user. Setiap thread menampilkan informasi pemilik thread dan diurutkan dari thread terbaru.

**Endpoint:** `GET /api/threads`

**Authentication:** Not required

**Dokumentasi / Screenshot:**

![Get all threads endpoint](![alt text](image-18.png) ![alt text](image-19.png))

**Expected response:** `200 OK`

### 6. Get My Threads

Endpoint ini digunakan untuk mengambil seluruh thread milik user yang sedang login. Data user ditentukan berdasarkan user ID di dalam JWT.

**Endpoint:** `GET /api/threads/my-threads`

**Authentication:** Required

```text
Authorization: Bearer <JWT_TOKEN>
```

**Dokumentasi / Screenshot:**

![Get my threads endpoint](![alt text](image-20.png) ![alt text](image-21.png))

**Expected response:** `200 OK`

**Contoh error:** `401 Unauthorized` jika request tidak memiliki token yang valid.

![Get my threads unauthorized](![alt text](image-22.png) ![alt text](image-23.png))

### 7. Get Thread Detail

Endpoint publik untuk melihat detail satu thread berdasarkan ID.

**Endpoint:** `GET /api/threads/:id`

**Authentication:** Not required

**Dokumentasi / Screenshot:**

![Get thread detail endpoint](![alt text](image-24.png) ![alt text](image-25.png))

**Expected response:** `200 OK`

**Contoh error:** `404 Not Found` jika thread tidak ditemukan.

![Get thread not found](![alt text](image-26.png) ![alt text](image-27.png))

### 8. Update Own Thread

User dapat mengubah title dan content thread yang dibuatnya sendiri. Sebelum update dilakukan, API memeriksa apakah user ID pada token sama dengan user ID pemilik thread.

**Endpoint:** `PUT /api/threads/:id`

**Authentication:** Required and owner only

```text
Authorization: Bearer <JWT_TOKEN>
```

**Dokumentasi / Screenshot:**

![Update thread endpoint](![alt text](image-28.png) ![alt text](image-29.png))

**Contoh request:**

```json
{
	"title": "Updated question title",
	"content": "Updated question content."
}
```

**Expected response:** `200 OK`

**Contoh error yang perlu didokumentasikan:**

- `401 Unauthorized` jika token tidak valid.
- `403 Forbidden` jika user bukan pemilik thread.
- `404 Not Found` jika thread tidak ditemukan.
- `400 Bad Request` jika request body tidak valid.

![Update thread forbidden](![alt text](image-30.png) ![alt text](image-31.png))

### 9. Delete Own Thread

User dapat menghapus thread yang dibuatnya sendiri. User lain tidak memiliki izin untuk menghapus thread tersebut.

**Endpoint:** `DELETE /api/threads/:id`

**Authentication:** Required and owner only

```text
Authorization: Bearer <JWT_TOKEN>
```

**Dokumentasi / Screenshot:**

![Delete thread endpoint](![alt text](image-32.png) ![alt text](image-33.png))

**Expected response:** `200 OK`

**Contoh error yang perlu didokumentasikan:**

- `401 Unauthorized` jika token tidak valid.
- `403 Forbidden` jika user bukan pemilik thread.
- `404 Not Found` jika thread tidak ditemukan.

![Delete thread forbidden](![alt text](image-34.png) ![alt text](image-35.png))

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JSON Web Token (JWT)
- bcryptjs
- Zod

## Database Relationship

Project ini menggunakan relasi one-to-many:

```text
One User  ------<  Many Threads
```

Satu user dapat membuat banyak thread. Setiap thread memiliki `userId` sebagai foreign key yang mengarah ke user pembuatnya.

Password disimpan pada field `passwordHash` dan tidak pernah dikembalikan pada endpoint publik.

## API Endpoint Summary

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and receive JWT |
| GET | `/api/users/:id` | No | View public user profile |
| POST | `/api/threads` | Yes | Create a thread |
| GET | `/api/threads` | No | List all threads |
| GET | `/api/threads/my-threads` | Yes | List current user's threads |
| GET | `/api/threads/:id` | No | View thread details |
| PUT | `/api/threads/:id` | Yes, owner only | Update own thread |
| DELETE | `/api/threads/:id` | Yes, owner only | Delete own thread |

## Environment Variables

Buat file `.env` di root project dengan konfigurasi berikut:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/qna_forum?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
JWT_EXPIRES_IN="1d"
```

Jangan commit file `.env` ke repository karena dapat berisi kredensial database dan secret JWT.

## Installation and Running

1. Clone repository ini.

2. Install dependencies:

	 ```bash
	 npm install
	 ```

3. Pastikan PostgreSQL berjalan dan database `qna_forum` tersedia.

4. Jalankan migration dan generate Prisma Client:

	 ```bash
	 npx prisma migrate dev
	 npx prisma generate
	 ```

5. Jalankan server dalam mode development:

	 ```bash
	 npm run dev
	 ```

API berjalan pada `http://localhost:3000`.

## OpenAPI Documentation

Spesifikasi OpenAPI tersedia di [docs/openapi.yaml](docs/openapi.yaml). File ini dapat di-import ke Swagger Editor, Swagger UI, atau Postman untuk mencoba seluruh endpoint dan mengambil screenshot dokumentasi.

Pada setiap screenshot, pastikan terlihat:

- HTTP method dan URL endpoint.
- Request body jika endpoint membutuhkannya.
- Header `Authorization` untuk endpoint protected.
- Response sukses.
- Response error yang relevan.

## HTTP Status Codes

| Status | Meaning | Example |
| --- | --- | --- |
| `200` | OK | Read, update, atau delete berhasil |
| `201` | Created | Register atau create thread berhasil |
| `400` | Bad Request | Input kosong, email invalid, atau body tidak valid |
| `401` | Unauthorized | Token tidak ada/invalid atau login gagal |
| `403` | Forbidden | User bukan pemilik thread |
| `404` | Not Found | User atau thread tidak ditemukan |
| `500` | Internal Server Error | Error server yang tidak terduga |

## Validation and Quality Checks

```bash
npm run build
npx prisma validate
```

## Project Structure

```text
src/
	app.ts                    Express app dan route registration
	server.ts                 Entry point server
	config/                   Environment configuration
	controllers/              Request dan response handlers
	middlewares/              Authentication, validation, error handling
	routes/                   API route definitions
	services/                 Business logic dan database operations
	validators/               Zod request schemas
	utils/                    AppError dan async handler
prisma/
	schema.prisma             Database schema dan relationships
	migrations/               Database migrations
docs/
	openapi.yaml              OpenAPI API documentation
	screenshots/              Screenshot Swagger UI untuk submission
```
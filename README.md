# Huawei Test Form App

## Deskripsi Proyek

Proyek ini merupakan hasil test untuk Technical Test: Developer - Digital Transformation & Analytics - PT. Huawei Tech Investment.

## Instalasi

Sebelum menjalankan program buat database sql terlebih dahulu, setelah itu lakukan setup database pada file prisma/schema.prisma dan .env.

```bash
# Contoh
$ npx prisma migrate dev
```

Setelah itu cek apakah table telah berhasil ditambahkan ke database.

## Menjalankan Program

### Front End

Untuk menjalankan front end, gunakan CMD dan masuk kedalam direktori frontend, setelah itu gunakan http-server pada port 3001 untuk menjalankannya.

```bash
# Contoh
$ http-server -p 3001
```

setelah itu buka localhost:3000 di browser.

### Back End

Untuk menjalankan backend, gunakan CMD dan masuk kedalam direktori backend/form-api, setelah itu jalankan perintah berikut:

```bash
# Contoh
$ node src/main.js
```

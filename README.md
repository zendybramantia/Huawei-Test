# Huawei Test Form App

## Deskripsi Proyek

Proyek ini merupakan hasil test untuk Technical Test: Developer - Digital Transformation & Analytics - PT. Huawei Tech Investment.

## Instalasi

Sebelum menjalankan program buat database sql terlebih dahulu, setelah itu lakukan setup database pada file prisma/schema.prisma dan .env.

```bash
$ npx prisma migrate dev
```

Setelah itu cek apakah table telah berhasil ditambahkan ke database.

## Menjalankan Program

### Front End

Untuk menjalankan front end, gunakan CMD dan masuk kedalam direktori frontend, setelah itu install http-server dan gunakan http-server pada port 3001 untuk menjalankannya.
```bash
$ npm install http-server
```
```bash
$ http-server -p 3001
```

setelah itu buka localhost:3001 di browser.

### Back End

Untuk menjalankan backend, gunakan CMD dan masuk kedalam direktori backend/form-api, setelah itu jalankan perintah berikut:

```bash
$ node src/main.js
```

### Automation

Untuk menjalankan automation testing, gunakan CMD dan masuk kedalam direktori automation, setelah itu jalankan perintah berikut:

```bash
$ python automation.py
```


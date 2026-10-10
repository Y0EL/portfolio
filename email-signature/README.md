# Tanda tangan email Yoel

## Berkas

- `public/assets/email/signature-intro.png` dan `signature-selected-work.png` mempertahankan desain gambar dari paket. Keduanya ditingkatkan dari 700 × 140 menjadi 1400 × 280 piksel untuk tampilan yang lebih tajam saat dipasang pada lebar 600 piksel.
- `public/email-signature/signature.html` adalah tanda tangan visual lengkap untuk percakapan bisnis yang sudah berjalan.
- `public/email-signature/signature-outreach-compact.html` adalah tanda tangan ringkas untuk perkenalan awal.
- `public/email-signature/sample-email.html` adalah contoh email utuh untuk calon klien manufaktur. Ganti kedua placeholder setelah memeriksa informasi perusahaan penerima.
- `public/email-signature/preview.html` menampilkan ketiganya untuk pemeriksaan di browser. Berkas `signature-preview.html` menggunakan jalur gambar lokal dan hanya dipakai untuk pratinjau.

Kedua gambar dipanggil melalui URL HTTPS publik di dalam elemen `img`. Gambar tersebut adalah sumber jarak jauh, bukan lampiran MIME dan bukan gambar `cid`. Klien email penerima dapat menyembunyikan gambar sampai penerima mengizinkannya. Nama dan kontak tetap berupa teks HTML yang dapat dipilih saat gambar tidak tampil.

## Melihat pratinjau

Buka `public/email-signature/preview.html` langsung di browser atau jalankan `npm run dev` dan buka `http://localhost:3000/email-signature/preview.html`. Pratinjau memakai gambar di `public/assets/email/`. HTML email final tetap memakai URL `https://www.yoel.online/assets/email/`.

## Memasang di Gmail web

1. Pastikan kedua URL gambar di `https://www.yoel.online/assets/email/` sudah dapat dibuka tanpa login.
2. Buka `https://www.yoel.online/email-signature/signature.html` atau versi ringkasnya di browser.
3. Pilih seluruh isi tanda tangan yang terlihat, lalu salin. Jangan menyalin kode sumber HTML sebagai teks biasa.
4. Di Gmail web, buka Setelan, Lihat semua setelan, Umum, lalu bagian Tanda tangan. Buat tanda tangan baru dan tempel isi yang disalin.
5. Pilih tanda tangan baku untuk email baru atau balasan sesuai kebutuhan, lalu simpan perubahan. Periksa hasilnya dengan mengirim email ke alamat milik sendiri, termasuk dari ponsel.

Mengubah berkas repo tidak mengubah tanda tangan akun Gmail secara otomatis. Editor tanda tangan aplikasi Gmail di ponsel tidak sama dengan editor Gmail web.

## Menggunakan Gmail API

Susun isi pesan sebagai HTML dan masukkan markup dari dalam elemen `body` pada salah satu berkas tanda tangan di akhir isi email. Untuk contoh perkenalan, `sample-email.html` sudah berisi pesan dan tanda tangan ringkas. Kirim sebagai bagian `text/html` pada MIME `multipart/alternative`, bersama bagian `text/plain` yang setara. Encode keseluruhan pesan MIME menjadi Base64URL untuk parameter `raw` pada Gmail API.

Jangan tambahkan kedua PNG sebagai lampiran atau bagian `multipart/related` dengan `cid`. URL HTTPS di atribut `src` sudah menjadi referensi gambar jarak jauh. Pengaturan tanda tangan di Gmail web tidak otomatis ditambahkan ke pesan yang dibentuk dan dikirim melalui Gmail API.

## Pemeriksaan sebelum memakai

Periksa `https://www.yoel.online/assets/email/signature-intro.png` dan `https://www.yoel.online/assets/email/signature-selected-work.png`. Keduanya harus mengembalikan status 200 dan tipe `image/png`. Periksa tautan website, email, dan WhatsApp pada email uji yang dikirim ke alamat sendiri.

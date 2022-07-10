# Fitur Aplikasi

- Modul data supplier
- Modul data barang
- Modul data jenis barang
- Modul data satuan barang
- Modul barang masuk
- Modul barang keluar
- Modul cetak laporan
- Modul data user
- Modul profile

## === DATA MASTER ===

## Data supplier

- name
- telp
- address

## Data Barang

- id
- name
- category
- stock -> @default(0)
- satuan

## Data Jenis Barang

- id
- name

## Data Satuan Barang

- id
- name

== DATA TRANSAKSI ===

## Barang Masuk (insert, delete)

- transaction_id
- date
- supplier
- name
- entries -> nilai entries dimasukkan kedalam stock -> stock(updated)
- user => org yang melakukan transaksi

## Barang Keluar

- transaction_id
- date
- supplier
- name
- amount_out -> nilai barang keluar mengurangi jumlah stock -> stock(updated)
- user => org yang melakukan transaksi

=== DATA USER ===

## User data

- id
- name
- username
- password
- email
- telp
- role
- isActive? boolean

RELATION

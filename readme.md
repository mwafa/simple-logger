# Node Logger

Ini merupakan apliaksi untuk melakukan log data berbasis **node.js**.

## Instalasi

### Install Node.JS

Untuk mengunduh aplikasi node.js silakan klik [disini](https://nodejs.org/en/).

### Clone Repositori

Caranya adalah dengan download file zip kemudian mengekstraknya di folder yang di inginkan.

#### Konfigurasi

##### Konfigurasi database
Untuk mengatur konfigurasi database dapat mengaturnya pada file `config/config.js`.
```javascript
module.exports = {
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
};
```
##### Import database

Menggunakan **phpmyadmin** import file `database.sql` pada folder config.

##### Mengatur file hasil logger

```javascript
        //Menyimpan dalam file log.txt
        log_to_txt("data/log.txt", param.var, param.value);
        //menyimpan ke csv
        log_to_csv("data/log.csv", param.var, param.value);

        // simpan ke database
        log_to_db(res);
```
Hasil dari file hasil logger ada di folder `data`.


## Menjalankan

Dengan menggunakan **terminal** atau **CMD** jalankan dengan menggunakan perintah.

```
node index.js
```

untuk melakukan logging data, menggunakan method **GET** pada port `8080` dengan parameter _var_ dan _value_.

contoh:

```
http://localhost:8080/?var=sensor&value=45
http://localhost:8080/?var=sensor&value=34
http://localhost:8080/?var=suhu&value=30
http://localhost:8080/?var=suhu&value=25
```



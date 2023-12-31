# JS/TS stack

Będziemy korzystać, z [express](https://expressjs.com/), który jest  minimalistyczny frameworkiem dla [Node.js](nodejs.org). Node.js jest wiodącą, open-source, platformą Javascript, skupioną na server-side.

Jest wiele innych frameworków dla Node.js, np., [nestjs](https://nestjs.com/) czy [koa](https://github.com/koajs/koa).

## Pierwsze kroki z express.js

Naszym celem jest utworzenie prostej aplikacji i nauczenie się narzędzi, z ekosystemu nodejs. Poniższe ćwiczenia jest oparte na [tutorialu developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment).

1. Utwórz repozytorium `pai_3_start` na githubie, będziemy tam umieszczać naszą aplikację:

   ```bash
   # zakladajac ze masz juz katalog
   # workspace/
   cd ~/workspace

   git clone ŚCIEŻKA_DO_TWOJEGO_REPOZYTORIUM
   cd pai_3_start

   # pierwszy krok to zawsze README.md
   touch README.md
   git add README.md
   git commit -m init
   git push -u master master
   ```

2. Zainicjuj `npm`, jako nazwę wpisz *hello_world_app*:

   ```bash
   # zakladam ze jestes
   # w katalogu pai_3_start

   npm init
   ```

   Przejrzyj zawartość pliku `package.json`:

   ```bash
   cat package.json
   ```

3. Zainstaluj [express](https://expressjs.com/):

   ```bash
   npm install express
   ```

   Co się zmieniło w `package.json`? Do czego służy `package-lock.json`?

4. Utwórz `index.js`, czyli *main* dla naszej aplikacji:

   ```javascript
   // importuje modul express
   const express = require("express"); // import express
   const app = express();
   const port = 3000;

   app.get("/", (req, res) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'text/plain');
       res.send("Hello World!");
   });

   // Uruchamia serwer nasłuchujący
   // na porcie 3000.
   app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
   });
   ```

5. Zweryfikujmy czy nasz aplikacja działa:

   ```bash
   node index.js
   ```

   Otwórze przeglądarkę adress: http://127.0.0.1:3000 lub skorzystaj z `curl`:

   ```bash
   curl 127.0.0.1:3000/
   ```

6. Zanim, przejdziemy dalej, zobaczmy jak działają taski, dodaj do `package.json`:

   ```json
   "scripts": {
         // ...
         "start": "node index.js"
         // ...
   }
   ```

7. Teraz możemy uruchomić naszą aplikację z CLI:

   ```bash
   npm start
   ```

8. Teraz dodajmy, komendę do uruchomienia lintera, zanim to zrobimy, zainstalujmy `eslint`:

   ```bash
   # instalacja lintera jako dev only
   # dependency
   npm install eslint --save-dev
   ```

   Co to jest linter?

   Jaki jest najpopularniejszy linter dla twojego ulubionego języka programowania?

9. Aby mieć dostępnego lintera jako komendę, dodaj do `package.json`:

   ```json
   "scripts": {
     // ...
     "start": "node index.js",
     "lint": "eslint src/js",
     // ...
   }
   ```

10. Możemy teraz uruchomić lintera:

   ```bash
   # na razie nie bedziemy zajmowac
   # sie bledem zgloszonym przez lintera
   npm run lint
   ```

11. Wrzuć wszystko do repozytorium git.

## Generatory szkieletu aplikacji

Większość frameworków posiada generatory aplikacji, pozwala to szybko zacząć pracę z danym narzędziem. Zobaczmy jako to działa dla expressa.

0. Utwórz repozytorium.

1. Wyjdź z katalogu gdzie mieliśmy naszą pierwszą aplikację *express*.

   ```bash
   # wrocmy do katalogu workspace/
   cd ~/workspace

   git clone ŚCIEŻKA_DO_TWOJEGO_REPOZYTORIUM
   cd pai_3_express

   npx express-generator --view=pug
   ```

   Przejrzyj plik - `cat package.json`.

2. Podążając za wskazówkami generatora, zainstaluj dependencies:

   ```bash
   npm install
   ```

3. Wszystko gotowe, żeby wystartować aplikację:

   ```bash
   DEBUG=pai-3-express:* npm start
   ```

   Otwórz przeglądarkę adres: http://127.0.0.1:3000.

4. Wraz z prowadzącymi, zapoznać się ze strukturą wygenerowanej aplikacji.

## Dodatnie routera

Dodajmy teraz endpoint `/hello`, który będzie nam zwracał `world!`.

1. W katalogu `routes/`, dodaj plik `hello.js`, który będzie naszym routerem obsługującym żądanie pod ścieżką `/hello`:

   ```javascript
   var express = require('express');
   var router = express.Router();

   router.get('/', function(req, res, next) {
       res.send('World!');
    });

    module.exports = router;
   ```

2. Teraz musimy zintegrować z główną aplikację, dodaj następujący kod w `app.js`:

   ```javascript

   // ...
   var indexRouter = require('./routes/index');
   var usersRouter = require('./routes/users');

   var helloRouter = require('./routes/hello'); // nasz router

   // ...
   ```

   ```javascript
   // ...

   app.use('/', indexRouter);
   app.use('/users', usersRouter);
   app.use('/hello', helloRouter); // mapowanie sciezki na router

   // ...
   ```

3. Czas uruchomić naszą aplikację:

   ```bash
   DEBUG=pai-3-express:* npm start
   ```

   w przeglądarce otwórz `http://127.0.0.1:3000/hello/`. Powinineś zobaczyc `World!`.

4. A co byśmy musieli zrobić, aby wyświetlić `World!`, kiedy użytkownik otworzy `http://127.0.0.1:3000/hello/witam`?

5. Na podstawie dokumentacji - [expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html) - zaimplementuj następującą funcjonalność:

   1. Kiedy otwieram `http://127.0.0.1:3000/hello/natalia`, powinienem zobaczyć `witaj Natalia!`;

   2. Kiedy otwieram `http://127.0.0.1:3000/hello?name=michal`, powinienem zobaczyć `witaj Michal!`;

6. Wrzuć swoją aplikację do githuba, repo: `pai_3_express`.

## Rozbudowa aplikacji - statyczne pliki

Podążając za [dokumentacją express](https://expressjs.com/en/starter/static-files.html), dodaj serwowanie pojedynczego statycznego pliku. Możesz przetestowac czy działa serwowanie statycznych plików z prostym plikiem http lub obrazkiem.

## Rozbudowa aplikacji - template engines

Aby wygenerować stronę html, serwowaną do klienta, musimy nauczyć się jak korzystać z [templetów](https://expressjs.com/en/guide/using-template-engines.html).

1. Generując szkielet aplikacji, jako template engine, wybraliśmy [pug](https://github.com/pugjs/pug), znajdź następujące linie w `app.js`:

   ```javascript
   // view engine setup
   app.set('views', path.join(__dirname, 'views'));
   app.set('view engine', 'pug');
   ```

2. Na zasadzie analogi do generacji strony startowej w routerze `routers/index.js`, zbuduj router oraz dodaj template dla ścieżki `/about`.

   Ścieżka about może zawierać dowolne informacje.

## Zaawansowane - Co to jest middleware (dodatkowe)

Na podstawie tutoriala na stronie: [expressjs.com/en/guide/writing-middleware.html](https://expressjs.com/en/guide/writing-middleware.html), dodaj middleware dla mierzenia czasu odpowiedzi.

## Materiały dodatkowe

- [mdn on JS basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics),
- [mdn on frameworks](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Introduction),
- [Express and Typescript](https://blog.logrocket.com/how-to-set-up-node-typescript-express/).

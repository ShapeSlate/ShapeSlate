# ShapeSlate

# License

Copyright (c) [2020] [Casper Peters, Daan Meijer and Sylt Schuurmans] under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## What is ShapeSlate?

The [Covid19 pandemic](https://en.wikipedia.org/wiki/COVID-19_pandemic) made it difficult to meet with other people due to the restrictions that have been setup by governments, which also makes it harder to share ideas with other people. 
Therefore we developed an application called ShapeSlate which allows you to share drawings in realtime and chat.

## Requirements

### Technologies which ShapeSlate is build upon:

```
Java 8
Angular 9
Postgresql
Spring Web
Spring Data JPA (Hibernate)
Spring WebSockets
```

### Required NodeJS packages

```
npm install @angular/core
npm install @angular/common
npm install vanilla-emoji-picker stompjs sockjs-client jquery ng2-canvas-whiteboard --save
npm i net -S
```

### How to setup ShapeSlate / Live Demo
On the site where ShapeSlate is hosted you will be presented with a login screen,
if you have no account you can register an account with the register button which is next to the login button.

Live demo (might take a while to start up initially):
[http://shapeslate.herokuapp.com](http://shapeslate.herokuapp.com)

## Heroku deployment

Heroku deployment is done via the seperate [deployment repo](https://github.com/ShapeSlate/ShapeSlateDeploy). This repo contains the angular front-end in a compiled form.


# Cloud player

Yet another SoundCloud desktop client. I need a better name but this will have
to do for now.

## Tech stack

- JavaScript ES6/ES7 (using [Babel](http://babeljs.io) as a transpiler)
- [Electron](http://electron.atom.io/)
- [React](http://facebook.github.io/react/) with [Alt](http://alt.js.org/)
- [SoundCloud JavaScript SDK](https://developers.soundcloud.com/docs/api/sdks#javascript)

## Install and run for development

### Install dependencies

App dependencies and dev dependencies are split into two `package.json` files
to make it easier to package the final Electron app. So, to install dependencies
for local development:

```
> npm install
> cd app
> npm install
```

### Start the app

```
> npm start
```

### Watch for JS and CSS changes

```
> npm run watch
```

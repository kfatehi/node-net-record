# net-record

This was written in haste for use with Leon (leon.ai) to move
the hotword microphone to where the microphone actually is.

This may be needed in circumstances where the client (where the
microphone actually is) is not the same place where the Leon 
hotword detection model runs (currently, a project called snowboy).

In such a situation, this package can be used as a drop-in replacement
for the microphone library expected by the hotword program, in place of
the microphone library.

### Instructions

Open `hotword/index.js`

Change the line that says:

```javascript
const record = require('node-record-lpcm16')
```

to this:

```javascript
const record = require('net-record')
```

Be sure to install the dependency by doing an `npm install net-record` in the hotword folder.

When you run `node hotword/index.js`, specify these environment variables:

```
NETRECORD_HOST=
NETRECORD_PORT=
```

So you will be running it like this:

```
NETRECORD_HOST=192.168.1.2 NETRECORD_PORT=7777
```

3. Start the microphone server with `npx net-record`

You may specify the server with the environment variable PORT, e.g.:

`PORT=7777 npx net-record`


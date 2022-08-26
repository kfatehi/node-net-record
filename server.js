// This script activates your microphone, starts a TCP server,
// and waits for Leon's hotword system to connect.
//
// This allows the hotword detection model to run local to Leon,
// without forcing the microphone to change. In reality, this was
// required because the computer with the microphone is an M1 or
// Apple Silicon, which segfaults when attempting to run the
// hotword package.
//
// N.B. If Leon runs in a browser, then it makes more sense to be
// streaming audio to the Leon server constantly for the purpose
// of remote hotword detection, thus obviating this TCP service.
const net = require('node:net');
const record = require('node-record-lpcm16')

const listenPort = process.env.PORT || process.env.NETRECORD_PORT || 8924

let mic = null;

const server = net.createServer((c) => {
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
    mic.unpipe(c);
    record.stop();
  });
  mic = record.start({
    threshold: 0,
    verbose: false
  })
  mic.pipe(c)
});

server.on('error', (err) => {
  throw err;
});

server.listen(listenPort, () => {
  console.log('server bound to port '+listenPort);
});

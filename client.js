const { Transform } = require('stream')
const net = require('node:net');

const connectOpts = {
  host: process.env.HOST || process.env.NETRECORD_HOST,
  port: process.env.PORT || process.env.NETRECORD_PORT || 8924
};

// This is a reconnecting remote microphone.
// It maintains an auto-reconnecting TCP connection to
// the remote server which is expected to feed microphone signal
class RemoteMicrophone extends Transform {
  constructor(opts) {
    super(opts);
    this.connect();
  }
  _transform(data, encoding, callback) {
    callback(null, data);
  }
  connect() {
    this.client = net.createConnection(connectOpts, (c) => {
      console.log('connected to remote microphone server');
      this.client.pipe(this)
    });
    this.client.on('end', () => {
      console.log('disconnected from remote microphone server');
      this.reconnect()
    });  
    this.client.on('error', (err)=>{
      console.log(err);
      this.reconnect()
    })
  }
  end() {
    // swallow this command to make replacing the connection on reconnect work seamlessly
    // after all, this stream never truly ends, it only goes idle until it can reconnect again.
  }
  reconnect() {
    this.client.unpipe()
    this.client = null;
    setTimeout(()=>{
      this.connect();
    }, 1000)
  }
}

module.exports.start = ()=> new RemoteMicrophone();
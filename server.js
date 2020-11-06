const path = require('path')
const { FtpSrv } = require('ftp-srv')

const host = process.env.HOST || '127.0.0.1'
const port = Number(process.env.PORT || 2121)
const pasv_url = process.env.PASV_URL || host
const pasv_min = Number(process.env.PASV_MIN || 30000)
const pasv_max = Number(process.env.PASV_MAX || 32000)
const root = path.join(__dirname, 'static')

const ftpServer = new FtpSrv({
  url: `ftp://${host}:${port}`,
  pasv_url,
  pasv_min,
  pasv_max,
  whitelist: ['USER', 'SYST', 'PWD', 'TYPE', 'SIZE', 'CWD', 'PASV', 'RETR', 'QUIT'],
  anonymous: true
})

ftpServer.on('login', ({ username, password }, resolve, reject) => {
  if (username === 'anonymous' && password === '@anonymous') {
    resolve({ root })
  } else {
    reject()
  }
})

ftpServer.listen().then(() => {
   console.log('listening on', host, port)
})

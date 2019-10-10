const files = require('./files')
const program = require('commander')

program
  .command('add-ip <ip>')
  .action(ip => files.addIP(ip))

program
  .command('remove-ip <ip>')
  .action(ip => files.removeIP(ip))

program
  .command('add-cred <key> <value>')
  .action((key, value) => files.addCredential(key, value))

program
  .command('remove-cred <key>')
  .action(key => files.removeCredential(key))

program
  .command('print-store')
  .option('-v, --values')
  .action(cmd => {
    const store = files.getStore()
    if (cmd.values) console.log(store)
    else console.log(Object.keys(store))
  })

program
  .command('print-ips')
  .action(() => {
    const whitelist = files.getWhitelist()
    console.log(whitelist)
  })

program.parse(process.argv)

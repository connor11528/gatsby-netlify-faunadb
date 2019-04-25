require('dotenv').config()

/* bootstrap database in your FaunaDB account */
const readline = require('readline')
const faunadb = require('faunadb')
const chalk = require('chalk')
const insideNetlify = insideNetlifyBuildContext()
const q = faunadb.query

if (!process.env.FAUNADB_SERVER_SECRET) {
  console.log('No FAUNADB_SERVER_SECRET found')
  console.log('Please run `netlify addons:create fauna` and redeploy')
  return false
}

console.log("server", process.env.FAUNADB_SERVER_SECRET)
console.log("admin", process.env.FAUNADB_ADMIN_SECRET)


console.log(chalk.cyan('Creating your FaunaDB Database...\n'))
if (insideNetlify) {
  // Run idempotent database creation
  setupFaunaDB(process.env.FAUNADB_SERVER_SECRET).then(() => {
    console.log('Database created')
  })
} else {
  console.log()
  console.log('You can create fauna DB keys here: https://dashboard.fauna.com/db/keys')
  console.log()
  ask(chalk.bold('Enter your faunaDB server key'), (err, answer) => {
    if (err) {
      console.log(err)
    }
    if (!answer) {
      console.log('Please supply a faunaDB server key')
      process.exit(1)
    }
    setupFaunaDB(answer).then(() => {
      console.log('Database created')
    })
  })
}

/* idempotent operation */
function setupFaunaDB(key) {

  console.log('Create the schema!')
  const client = new faunadb.Client({
    secret: key
  })

  return client.query(
    q.CreateClass({
      name: "salesperson"
    }))
    .then(() => {

    })
    .then(console.log.bind(console))
    .catch((e) => {
      if (e.message === 'instance not unique') {
        console.log("schema already created... skipping");
      } else {
        console.error(e)
        throw e
      }
    })
}

/* util methods */

// Test if inside netlify build context
function insideNetlifyBuildContext() {
  if (process.env.DEPLOY_PRIME_URL) {
    return true
  }
  return false
}

// Readline util
function ask(question, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question(question + '\n', function(answer) {
    rl.close()
    callback(null, answer)
  })
}
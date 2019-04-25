require('dotenv').config()

const fauna = require('faunadb');
const q     = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {

  const data = JSON.parse(event.body)
  const salesperson = {
    data: data
  };

  return client.query(q.Create(q.Ref('classes/salesperson'), salesperson))
    .then((response) => {

      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    }).catch((error) => {

      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
}
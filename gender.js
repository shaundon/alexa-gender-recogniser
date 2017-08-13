const request = require('request')

const URL = `https://api.genderize.io/?name=`

const makeRequest = (nameToCheck) => {
  return new Promise((fulfill, reject) => {
    request(`${URL}${nameToCheck}`, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        reject(err)
      } else {
        try { fulfill(JSON.parse(body))}
        catch(ex) { reject(ex) }
      }
    })
  })
}

exports.assumeGender = (name) => makeRequest(name)

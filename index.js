const Alexa = require('alexa-sdk')
const {appId} = require('./config.json')
const {assumeGender} = require('./gender.js')

const helpMessage = `Say 'when is the next bank holiday' to find out when the next bank holiday in England and Wales is.`

const handlers = {
  "AssumeGenderIntent"() {
    const name = this.event.request.intent.slots.Name
    assumeGender(name).then(
      (result) => {
        console.log(result)
        let msg = ``;
        if (result.gender) {
          msg = `I couldn't determine what gender ${result.name} is. Sorry.`
        } else {
          msg = `The name ${result.name} has a ${result.probability * 100}% chance of being ${result.gender}.`
        }
        this.emit(':tell', msg)
      },
      (err) => {
        this.emit(':tell', `Something went wrong. Sorry about that.`)
      }
    )
  },
  "AboutIntent"() {
    this.emit(':tell', 'UK Bank Holidays tells you when the next bank holiday is in England and Wales.')
  },
  "AMAZON.HelpIntent"() {
    this.emit(':ask', helpMessage, helpMessage);
  },
  "AMAZON.StopIntent"() {
    this.emit(':tell', 'Goodbye.')
  },
  "AMAZON.CancelIntent"() {
    this.emit(':tell', 'Goodbye.')
  },
  "AMAZON.LaunchRequest"() {
    this.emit(':ask', helpMessage, helpMessage)
  },
  "Unhandled"() {
    this.emit(':ask', helpMessage, helpMessage);
  },
}

exports.handler = (event, context) => {
  let alexa = Alexa.handler(event, context)
  alexa.APP_ID = appId
  alexa.registerHandlers(handlers)
  alexa.execute()
}

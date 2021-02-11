const mongoose = require('mongoose');
const schedule = require('node-schedule');
const axios = require('axios');
const sgMail = require('@sendgrid/mail')

const { Player } = require('./model/player');


mongoose.connect('mongodb://localhost/coc-api')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(() => console.log('Could not connected to MongoDB...'))

const job = schedule.scheduleJob('50 23 * * *', async () => {
    console.log('schedule');
    const p = await getPlayerInformation('C002PGGP');
    await savePlayer(p);
})

const getPlayerInformation = async (playerId) => {
    try {
        const response = await axios.get(`https://api.clashofclans.com/v1/players/%23${playerId}`, {
            headers: {
                // 'content-Type': 'application/Json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjI2MjA4NDViLTNlODUtNDE4MS05MWM2LTIxMGYxM2FlNGEwMiIsImlhdCI6MTYxMjg4NTMzMSwic3ViIjoiZGV2ZWxvcGVyL2Y4MDYzMGQxLTBlZTgtMjk0Zi04ZTg1LWI4OTljYWVhNGY0ZSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjQ1LjE2Mi4yMDguOCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.wMADWh3Bk974ZB1mL3BOI9Ia3sVa26BTV_rJpgRCT1DuvKbZsBWFZafQ28mdYkfAHYc2JLdNhcnypRwxAz3AmQ'
            }
        })

        return response.data;

    } catch (e) {
        console.error(e);
    }
}

const compareData = async (player) => {
    const actualPlayerInformation = new Player(player);
    actualPlayerInformation.compareWithTheLast();
}

const savePlayer = async (player) => {
    let p = new Player(player);
    p = await p.save();
    sendmail(p)
    return p;
}

getPlayerInformation('C002PGGP')

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript

const sendmail = (datos) => {
    sgMail.setApiKey('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')
    const msg = {
        to: 'andres.olmos.n@gmail.com', // Change to your recipient
        from: 'andres.olmos.n@gmail.com', // Change to your verified sender
        subject: 'Datos clash of clans guardados ',
        text: 'Datos guardados',
        html: '<p>Se guardo la información de hoy en la BD</p>',
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}
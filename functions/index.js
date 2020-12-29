const admin = require('firebase-admin')
const bodyParser = require('body-parser')

var serviceAccount = require("./service-account-file.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ynci-f904e.firebaseio.com'
})

const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/send-notification', function (request, response) {
	try {
		const title = request.body.title
		const body = request.body.body
		const type = request.body.type

		admin.messaging().sendToTopic('community', {
			notification: {
			},
			data: {
				title: title,
				body: body,
				type: type,
				click_Action: "FLUTTER_NOTIFICATION_CLICK"
			}
		})
		response.status(200).json({
			status: 200,
			message: "Ok." 
		});
	} catch(e) {
		console.log(e.message)
	}
})

app.listen(6000, () => {
  console.log(`\n\t *** Server listening on PORT 6000  ***`)
})

// exports.sendNotification = functions.firestore.document('forum/{message}').onCreate((snap, context) => {
// 	return admin.messaging().sendToTopic('forum', {
// 		notification: {
// 			title: snap.data().username,
// 			body: snap.data().text,
// 			clickAction: 'FLUTTER_NOTIFICATION_CLICK'
// 		}
// 	})
// });
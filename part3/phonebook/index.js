/* eslint-disable no-mixed-spaces-and-tabs */
require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const Phone = require("./models/person")
const cors = require("cors")

const requestLogger = (request, response, next) => {
	console.log("Method:", request.method)
	console.log("Path:  ", request.path)
	console.log("Body:  ", request.body)
	console.log("---")
	next()
}

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))
app.use(cors())
app.use(express.static("dist"))
app.use(express.json())

app.use(requestLogger)


app.get("/api/persons", (request, response) => {
	Phone.find({}).then(persons => {
    
		response.json(persons)
	})
})



app.get("/api/persons/:id", (request, response, next) => {
	Phone.findById(request.params.id).then(person => {
		if (person) {
			response.json(person)
		} else {
			response.status(404).end()
		}
	}).catch(error => next(error))
})

app.post("/api/persons", (request, response) => {
	const body = request.body
	if (!body.name || !body.number) {
		return response.status(400).json({
			error: "content missing",
		})
	}

	if (Phone.find({name: body.name})) {
		return response.status(400).json({
	    error: "name must be unique",
	  })
	}


	const person = new Phone ({
		name: body.name,
		number: body.number,
	})
  
	person.save().then(savedPerson => {
		response.json(savedPerson)
	})

})

const errorHandler = (error, request, response, next) => {
	console.error(error.message)
	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	} 
	next(error)
}

app.use(errorHandler)

app.delete("/api/persons/:id", (request, response, next) => {
	Phone.findByIdAndRemove(request.params.id).then(() => {
		response.status(204).end()
	})
		.catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
	const id = request.params.id
	const body = request.body

	const updatedPerson = {
		name: body.name,
		number: body.number,
	}

	Phone.findByIdAndUpdate(id, updatedPerson, { new: true })
		.then((updated) => {
			response.json(updated)
		})
		.catch((error) => next(error))
})


app.listen(3000, () => {
	console.log("Server running on port 3000")
})

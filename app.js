const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const estudiantesRoutes = require("./src/routes/estudiantes");
const path = require("path")

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Prueba tecnica Finaktiva",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:9000"
            },
        ],
    },
    apis: [`${path.join(__dirname, "./src/routes/*.js")}`]
};

const app = express();
const port = process.env.PORT || 8080;

// midleware
app.use(express.json());
app.use('/api', estudiantesRoutes);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

//routes
app.get('/', (req, res) => {
    res.send("Welcome to my API");
});

//mongodb conection
mongoose
    .connect('mongodb+srv://sebas:d3duuyb0zZ9hP91P@cluster0.z4plknc.mongodb.net/databasecolegio?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('server listening on port', port));

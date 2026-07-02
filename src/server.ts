import app from "./app";

const PORT = 8080;




//* listen
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
});
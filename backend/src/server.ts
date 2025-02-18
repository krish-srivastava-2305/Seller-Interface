import app from "./app";

// Start the server
const init = () => {
    // Checks for Environment Variables
    if (!process.env.PORT) {
        throw new Error("Port is not defined");
        process.exit(1);
    }
    app.listen(process.env.PORT!, () => {
        console.log(`Server is running on port: ${process.env.PORT}`);
    })
}

init();

import server from "./server";
import colors from "colors";

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(colors.bgGreen.black(`Listening on ${PORT}`));
});

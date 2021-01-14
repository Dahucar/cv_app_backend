const app = require("./app");
const dbConnect = require("./db/db");

dbConnect();

app.listen(app.get('port'), () => {
    console.log('Server on port '+ app.get('port'));
});

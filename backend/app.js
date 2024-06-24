const libExpress = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./router/user.router');
const adminRouter = require('./router/admin.router');
const libUtils = require('./utils')
const cookieParser = require('cookie-parser')


const app = libExpress();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(libExpress.json());


app.use('/user',userRouter);
app.use('/admin',adminRouter);


app.use('/uploads', libExpress.static('uploads'));

app.listen(process.env.PORT, () => {
    libUtils.logger(`server is started on port ${process.env.PORT}`, 1);
})


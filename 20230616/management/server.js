const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const express = require("express"); // Express 모듈을 가져옴
const app = express();
const routers = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const MONGO_URL = 'mongodb://user:1q2w3e4r!@got64.pub-vpc.mg.naverncp.com:17017/?authMechanism=DEFAULT&directConnection=true';
const MONGO_DB_NAME = 'management'
const port = process.env.PORT || 5000

//1. MongoDB Connection
mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: MONGO_DB_NAME,
    })
    .then(() => {
        console.log(`[+] mongoseDB Connection`);
    })
.catch((err) => console.error(`[-] mongoseDB ERROR :: ${err}`));

app.listen(port, () => console.log(`Listening on port ${port}`));

// 컬럼(Document) 구성
const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    image: { type: String },
    name: { type: String },
    birthday: { type: String },
    gender: { type: String },
    job: { type: String }
  }),
  'customer' // 컬렉션 이름을 명시적으로 지정
);

// 고객 데이터 조회 API
app.get('/api/customers', async function(req, res) {
  try {
    const customers = await Customer.find({});
    res.status(200).send(customers);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// 앱에 라우터 등록
app.use('/api', routers);
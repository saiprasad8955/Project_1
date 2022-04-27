const authorModels = require("../models/authorModel.js");

const createAuthor = async function (req, res) {
  let data = req.body;

  /// validate the data first
  if (Object.keys(data).length == 0) {
    return res.status(400).send({
      status: false,
      msg: "Invalid request !! Please Provide Author Details ",
    });
  }

  // validate the first name of author
  if (!data.fname) {
    return res.status(400).send({
      status: false,
      msg: "Please Provide Provide First Name Of Author ",
    });
  }

  // validate the Last Name of author
  if (!data.lname) {
    return res
      .status(400)
      .send({ status: false, msg: "Please Provide Last Name Of Author " });
  }

  // validate the email of author is Coming in data or not
  if (!data.email) {
    return res
      .status(400)
      .send({ status: false, msg: "Please Provide Email Of Author " });
  }
  // Validate the email correctly
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
    res.status(400).send({
      status: false,
      message: "Email should be a valid email address",
    });
  }

  // Validate the already existing email
  alreadyExist = await authorModels.findOne({ email: data.email });
  if (alreadyExist) {
    res.status(400).send({
      status: false,
      message: "Email address is already registered",
    });
  }

  // validate the password of author
  if (!data.password) {
    return res
      .status(400)
      .send({ status: false, msg: "Please Provide Password Of Author " });
  }

  // validate the title of author
  if (!["Mr", "Mrs", "Miss"].includes(data.title)) {
    return res.status(400).send({
      status: false,
      msg: "Title Must be these values [Mr, Mrs, Miss] ",
    });
  }

  let author = await authorModels.create(data);
  res
    .status(200)
    .send({ status: true, msg: "Author Successfully Created", data: author });
};

module.exports.createAuthor = createAuthor;
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");
const auth = require("../auth");
const clientId ="616749084292-hki1ef97luqrgvrc0cedli2ppq7f6sjl.apps.googleusercontent.com";

//User Information
module.exports.emailExists = (params) => {
  return User.find({ email: params.email }).then((result) => {
    return result.length > 0 ? true : false;
  });
};

module.exports.register = (params) => {
  let user = new User({
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    mobileNo: params.mobileNo,
    password: bcrypt.hashSync(params.password, 10),
    loginType: "email",
  });

  return user.save().then((user, err) => {
    return err ? false : true;
  });
};

module.exports.login = (params) => {
  return User.findOne({ email: params.email }).then((user) => {
    if (user === null) {
      return { error: "does-not-exist" };
    }
    if (user.loginType !== "email") {
      return { error: "login-type-error" };
    }

    const isPasswordMatched = bcrypt.compareSync(
      params.password,
      user.password
    );

    if (isPasswordMatched) {
      return { accessToken: auth.createAccessToken(user.toObject()) };
    } else {
      return { error: "incorrect-password" };
    }
  });
};

module.exports.get = (params) => {
  return User.findById(params.userId).then((user) => {
    user.password = undefined;
    return user;
  });
};

module.exports.update = (params) => {
  const updates = {
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    mobileNo: params.mobileNo,
  };
  return User.findByIdAndUpdate(params.userId, updates).then((doc, err) => {
    return err ? false : true;
  });
};

module.exports.upload = (params) => {
  const updates = {
    avatar: params.avatar,
  };
  return User.findByIdAndUpdate(params.userId, updates).then((doc, err) => {
    return err ? false : true;
  });
};

module.exports.changePassword = (params) => {
  const updates = {
    password: bcrypt.hashSync(params.password, 10),
  };
  return User.findByIdAndUpdate(params.userId, updates).then((doc, err) => {
    return err ? false : true;
  });
};

module.exports.verifyGoogleTokenId = async (tokenId) => {
  // Client object from the 'google-auth-library' package used to authorize and authenticate communication with Google APIs
  const client = new OAuth2Client(clientId);
  const data = await client.verifyIdToken({
    idToken: tokenId,
    audience: clientId,
  });

  console.log(data.payload.email_verified);

  if (data.payload.email_verified === true) {
    const user = await User.findOne({ email: data.payload.email });

    console.log(user);

    if (user !== null) {
      if (user.loginType === "google") {
        return { accessToken: auth.createAccessToken(user.toObject()) };
      } else {
        return { error: "login-type-error" };
      }
    } else {
      const user = new User({
        firstName: data.payload.given_name,
        lastName: data.payload.family_name,
        email: data.payload.email,
        avatar: data.payload.picture,
        loginType: "google",
      });

      return user.save().then((user, err) => {
        return { accessToken: auth.createAccessToken(user.toObject()) };
        //.toObject() mongoose method
      });
    }
  } else {
    return { error: "google-auth-error" };
  }
};

//Categories
//create category
module.exports.createCategory = (params) => {
  return User.findById(params.userId).then((user) => {
    user.categories.push({
      categoryIcon: params.categoryIcon,
      categoryName: params.categoryName,
      categoryType: params.categoryType,
    });
    return user.save().then((user, err) => {
      return err ? false : true;
    });
  });
};

//update category
module.exports.update = (params) => {
  return User.updateOne(
    {
      _id: params.userId,
      "categories._id": params.categoryId,
    },

    {
      $set: {
        "categories.$.categoryName": params.categoryName,
        "categories.$.categoryType": params.categoryType,
        "categories.$.categoryIcon": params.categoryIcon,
      },
    }
  ).then((doc, err) => {
    return err ? false : true;
  });
};

//soft delete category
module.exports.archive = (params) => {
  return User.updateOne(
    {
      _id: params.userId,
      "categories._id": params.categoryId,
    },

    {
      $set: {
        "categories.$.isActive": false,
      },
    }
  ).then((doc, err) => {
    return err ? false : true;
  });
};

//Records
//create record
module.exports.addRecord = (params) => {
  return User.findById(params.userId).then((user) => {
    user.records.push({
      categoryName: params.categoryName,
      categoryType: params.categoryType,
      categoryIcon: params.categoryIcon,
      amount: params.amount,
      description: params.description,
      dateCreated: params.dateCreated,
      transactionBalance: params.transactionBalance,
    });
    return user.save().then((user, err) => {
      return err ? false : true;
    });
  });
};

//update record
module.exports.updateRecord = (params) => {
  return User.updateOne(
    {
      _id: params.userId,
      "records._id": params.recordId,
    },

    {
      $set: {
        "records.$.categoryName": params.categoryName,
        "records.$.categoryType": params.categoryType,
        "records.$.categoryIcon": params.categoryIcon,
        "records.$.amount": params.amount,
        "records.$.description": params.description,
        "records.$.currentBalance": params.currentBalance,
      },
    }
  ).then((doc, err) => {
    return err ? false : true;
  });
};

//soft delete records
module.exports.archiveRecord = (params) => {
  return User.updateOne(
    {
      _id: params.userId,
      "records._id": params.recordId,
    },

    {
      $set: {
        "records.$.isActive": false,
      },
    }
  ).then((doc, err) => {
    return err ? false : true;
  });
};

module.exports.updateBalance = (params) => {
  const updates = {
    balance: params.balance,
  };
  return User.findByIdAndUpdate(params.userId, updates).then((doc, err) => {
    return err ? false : true;
  });
};

//update record
module.exports.updateTransactionBalance = (params) => {
  return User.updateOne(
    {
      _id: params.userId,
      "records._id": params.recordId,
    },

    {
      $set: {
        "records.$.transactionBalance": params.transactionBalance,
      },
    }
  ).then((doc, err) => {
    return err ? false : true;
  });
};

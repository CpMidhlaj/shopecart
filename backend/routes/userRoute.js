const express = require("express");
const { getAllUsers, userRegister, userLogin, userProfileUpdate, updateUserRole, updateUserStatus, userProfileDelete, deletedUserByAdmin, userLogout } = require("../controllers/userControl");
const { userAuth, userAuthorization } = require("../middleware/userAuth");
const upload = require("../middleware/fileUpload");

const router = express.Router();

router.route('/register').post(upload.single("userPhoto"),userRegister);
router.route('/login').post(userLogin);
router.route('/logout').post(userLogout);
router.route('/all').get(userAuth,userAuthorization(["admin"]),getAllUsers);
router.route('/profile').put(userAuth,userProfileUpdate).delete(userAuth,userProfileDelete);
router.route('/update-user-role/:id').put(userAuth,userAuthorization(["admin"]),updateUserRole);
router.route('/update-user-status/:id').put(userAuth,userAuthorization(["admin"]),updateUserStatus);
router.route('/deleted-user/:id').delete(userAuth,userAuthorization(["admin"]),deletedUserByAdmin);

module.exports = router
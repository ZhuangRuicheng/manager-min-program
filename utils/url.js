//图片上传
var imageUpload = '/api/user/common/imageUpload';

//获取订单类型
var getOrderTypes = '/api/user/order/getOrderTypes';

//查询订单
var queryOrderList = '/api/user/order/queryOrderList';

//查询订单2
var queryOrderList2 = '/api/user/order/queryOrderList2';

//查询订单状态数量
var getOrderStatusCount = '/api/user/order/getOrderStatusCount';

//获取订单详情
var getOrderDetail = '/api/user/order/getOrderDetail';

//订单受理
var acceptOrder = '/api/user/order/acceptOrder';

//订单回复
var reply = '/api/user/order/reply';

//订单完成
var completeOrder = '/api/user/order/completeOrder';

//获取酒店信息
var getHotelInfo = '/api/user/hotel/getHotelInfo';

//更新酒店信息
var updateHotelInfo = '/api/user/hotel/updateHotelInfo';

//获取首页轮播图
var getHomePageBanners = '/api/user/hotel/getHomePageBanners';

//添加首页轮播图
var addHomePageBanner = '/api/user/hotel/addHomePageBanner';

//删除首页轮播图
var deleteHomePageBanner = '/api/user/hotel/deleteHomePageBanner';

//获取楼层
var getFloors = '/api/user/hotel/getFloors';

//获取房间列表
var getRooms = '/api/user/hotel/getRooms';

//添加房间
var addRooms = '/api/user/hotel/addRooms';

//删除房间
var deleteRoom = '/api/user/hotel/deleteRoom';

//生成二维码(base64编码)
var generateQrCode = '/api/user/hotel/generateQrCode';

//生成二维码（流）
var generateQrCodeStream = '/api/user/hotel/generateQrCodeStream';

//刷新二维码
var refreshQrCode = '/api/user/hotel/refreshQrCode';

//生成批量二维码发送到指定邮箱
var batchGenerateQrCode = '/api/user/hotel/batchGenerateQrCode';

//获取酒店邮箱
var getHotelMail = '/api/user/hotel/getHotelMail';

//获取酒店设施
var getFacilitiesList = '/api/user/hotel/getFacilitiesList';

//删除酒店设施
var delFacilities = '/api/user/hotel/delFacilities';

//添加酒店设施
var addFacilities = '/api/user/hotel/addFacilities';

// 获取房型
// var getRoomTypeList = '/api/user/hotel/getRoomTypeList';
var getRoomTypeList = '/api/room/type/getRoomTypeList';

//保存房型信息
// var saveRoomType = '/api/user/hotel/saveRoomType';
var saveRoomType = '/api/room/type/saveRoomTypeBaseInfo';

//删除房型
var delRoomType = '/api/user/hotel/delRoomType';

//开启房型预订
var openRoomTypeBook = '/api/user/hotel/openRoomTypeBook';

//关闭房型预订
var closeRoomTypeBook = '/api/user/hotel/closeRoomTypeBook';

//登录
var login = '/api/user/login';

//获取登陆首页信息
var getHomePageInfo = '/api/user/getHomePageInfo';

//退出登录
var logout = '/api/user/logout';

//获取职位列表
var findPositions = '/api/user/findPositions';

//添加职位
var addPosition = '/api/user/addPosition';

//删除职位
var deletePosition = '/api/user/deletePosition';

//添加用户
var addUser = '/api/user/addUser';

//获取用户列表
var getUsers = '/api/user/getUsers';

//根据id获取用户信息
var getUserInfoById = '/api/user/getUserInfoById';

//更新用户信息
var updateUserInfo = '/api/user/updateUserInfo';

//修改密码
var modifyPassword = '/api/user/modifyPassword';

//禁用用户
var disableUser = '/api/user/disableUser';

//恢复用户
var enableUser = '/api/user/enableUser';

//保存用户头像
var saveUserImage = '/api/user/saveUserImage';

//获取酒店余额
var getHotelMoney = '/api/user/finance/getFinance';

//获取银行账号信息
var getBankAccountInfo = '/api/user/finance/getBankAccountInfo';

//保存银行账户信息
var saveBankAccountInfo = '/api/user/finance/saveBankAccountInfo'

//提现
var withdrawCash = '/api/user/finance/withdrawCash';

//获取酒店金额明细表
var getDetailList = '/api/finance/getDetailList'

//判断商户采用微信支付还是爱农支付
var getFinance = '/api/finance/getFinance'

//微信支付账单详情
var getMdWxSettleList = '/api/finance/getMdWxSettleList';

//爱农支付账单详情
var getAnSettleList = '/api/finance/getAnSettleList';

//获取数据统计信息
// var getStatisticsInfo ='/api/user/statistics/getStatisticsInfo';
var getStatisticsInfo = '/api/user/statistic/getStatisticsInfo';


//获取用户列表
var queryCustomerList = '/api/user/customer/queryCustomerList';

//获取用户登录记录
var getCustomerLoginLog = '/api/user/customer/getCustomerLoginLog';

//获取酒店功能开关状态
var getHotelFunctionStatus = '/api/user/config/getHotelFunctionStatus';

//更新酒店更能开关
var updateHotelFunctionStatus = '/api/user/config/updateHotelFunctionStatus';

//获取wifi信息
var getWifiInfo = '/api/user/config/getWifiInfo';

//保存wifi信息
var saveWifiInfo = '/api/user/config/saveWifiInfo';

//获取店长热线
var getMgrPhoneNumber = '/api/user/config/getMgrPhoneNumber';

//保存店长热线
var saveMgrPhoneNumber = '/api/user/config/saveMgrPhoneNumber'

//获取值班经理留言
var getManagerLeaveMessage = '/api/user/config/getManagerLeaveMessage';

//保存值班经理留言
var saveManagerLeaveMessage = '/api/user/config/saveManagerLeaveMessage';

//获取可开发票类型
var getInvoiceTypes = '/api/user/config/getInvoiceTypes';

//保存可开发票类型
var saveInvoiceTypes = '/api/user/config/saveInvoiceTypes';

//获取早餐券信息
var getBreakfastCouponInfo = '/api/user/config/getBreakfastCouponInfo';

//更新早餐券信息
var updateBreakfastCouponInfo = '/api/user/config/updateBreakfastCouponInfo';

//获取VIP等级列表
var getVipGrades = '/api/user/config/getVipGrades';

//保存VIP等级
var saveVipGrade = '/api/user/config/saveVipGrade';

//删除VIP等级
var deleteVipGrade = '/api/user/config/deleteVipGrade';

//获取迷你吧信息
var getMiniBarInfo = "/api/user/minibar/getMiniBarInfo";

//更新迷你吧信息
var updateMiniBarInfo = '/api/user/minibar/updateMiniBarInfo';

//获取迷你吧商品分类
var getCategories = '/api/user/minibar/getCategories';

//添加迷你吧商品分类
var addCategories = '/api/user/minibar/addCategories';

//更新商品类别名称
var updateCategoryName = '/api/user/minibar/updateCategoryName';

//删除商品类别
var deleteCategoryById = '/api/user/minibar/deleteCategoryById';

//获取迷你吧商品列表
var getProducts = '/api/user/minibar/getProducts';

//商品上下架
var updateProductStatus = '/api/user/minibar/updateProductStatus';

//删除商品
var deleteProduct = '/api/user/minibar/deleteProduct';


//保存商品
var saveProduct = '/api/user/minibar/saveProduct';

//微信登录
var loginWechat = '/api/user/wechat/login';

//根据微信code获取loginToken
var getLoginToken = '/api/user/wechat/getLoginToken';

//获取房间二维码base64
var getQrCodeBase64 = '/api/room/getQrCodeBase64';

//获取房间二维码图片流
var getQrCodeStream = '/api/room/getQrCodeStream';

//绑定房间二维码
var bindQrCode = '/api/room/bindQrCode';

//解绑房间二维码
var unBindQrCode = '/api/room/unBindQrCode';

//禁用二维吗
var disableRoomQrCode = '/api/room/disableRoomQrCode';

//重新绑定房间二维码
var reBindQrCode = '/api/room/reBindQrCode';

//获取金额明细详情
var getFinanceDetail = '/api/finance/getFinanceDetail';

//下载账单
var downloadBills = '/api/user/finance/downloadBills';

//发送账单到指定邮箱
var sendBills2Mail = '/api/finance/sendBills2Mail';

//获取早餐券介绍信息
var getBreakfastInfo = '/api/voucher/getBreakfastVoucherInfo';

//保存早餐券介绍信息
var saveBreakfastInfo = '/api/voucher/saveBreakfastVoucherInfo';

//获取早餐券设置
var getBreakfastSetUp = '/api/voucher/getBreakfastVoucherSetUp';

//保存早餐券设置
var saveBreakfastVoucherSetUp = '/api/voucher/saveBreakfastVoucherSetUp';

//获取当前有效早餐券
var getCurrentBreakfastVouchers = '/api/voucher/getCurrentBreakfastVouchers';

//扫码核销
var scanCodeCancel = '/api/voucher/scanCodeCancel';

//数字核销
var numberCancel = '/api/voucher/digitalCancel';

//获取早餐券统计默认月份列表
var getBreakfastMonth = '/api/voucher/getBreakfastVoucherDataMonths';

//获取早餐券统计
var BreakfastDataByMonth = '/api/voucher/getBreakfastVoucherDataByMonth';

//获取早餐券二维码base64编码
var breakfastQrCodeBase64 = '/api/voucher/getBreakfastVoucherReceiveQrCodeBase64';

//获取领取早餐券的二维码(Stream)
var breakfastQrCodeStream = '/api/voucher/getBreakfastVoucherReceiveQrCodeStream';

//重置领取早餐券二维码
var resetBreakfastQr = '/api/voucher/resetBreakfastVoucherReceiveQrCode';

//获取基础房型
var getRoomTypeBaseInfo = '/api/room/type/getRoomTypeBaseInfo';

//获取房型配置信息
var getRoomTypeConfigInfo = '/api/room/type/getRoomTypeConfigInfo';

//保存房型配置信息
var saveRoomTypeConfigInfo = '/api/room/type/saveRoomTypeConfigInfo';

//酒店预订拒单
var refusalOrder = '/api/hotel/book/refusalOrder';

//酒店预订受理
var hotelAcceptOrder = '/api/hotel/book/acceptOrder'

/**  ****客房送餐接口****  */
//获取类别
var getCategoryList = '/api/meal/getCategoryList';

//保存类别
var saveCategory = '/api/meal/saveCategory';

//删除类别
var mealsDelCategory = '/api/meal/delCategory';

//保存送餐信息
var saveMealInfo = '/api/meal/saveMealInfo';

//获取送餐信息
var getMealInfo = '/api/meal/getMealInfo';

//保存商品
var mealsSaveProduct = '/api/meal/saveProduct';

//获取商品
var mealsGetProductList = '/api/meal/getProductList';

//删除商品
var mealsDelProduct = '/api/meal/delProduct';


module.exports = {
  addRooms: addRooms,
  imageUpload: imageUpload,
  getOrderTypes: getOrderTypes,
  queryOrderList: queryOrderList,
  queryOrderList2: queryOrderList2,
  getOrderStatusCount: getOrderStatusCount,
  getOrderDetail: getOrderDetail,
  acceptOrder: acceptOrder,
  reply: reply,
  completeOrder: completeOrder,
  getHotelInfo: getHotelInfo,
  updateHotelInfo: updateHotelInfo,
  getHomePageBanners: getHomePageBanners,
  addHomePageBanner: addHomePageBanner,
  deleteHomePageBanner: deleteHomePageBanner,
  getFloors: getFloors,
  getRooms: getRooms,
  deleteRoom: deleteRoom,
  generateQrCode: generateQrCode,
  generateQrCodeStream: generateQrCodeStream,
  refreshQrCode: refreshQrCode,
  batchGenerateQrCode: batchGenerateQrCode,
  getHotelMail: getHotelMail,
  getFacilitiesList: getFacilitiesList,
  delFacilities: delFacilities,
  addFacilities: addFacilities,
  getRoomTypeList: getRoomTypeList,
  saveRoomType: saveRoomType,
  delRoomType: delRoomType,
  openRoomTypeBook: openRoomTypeBook,
  closeRoomTypeBook: closeRoomTypeBook,
  login: login,
  getHomePageInfo: getHomePageInfo,
  logout: logout,
  findPositions: findPositions,
  addPosition: addPosition,
  deletePosition: deletePosition,
  addUser: addUser,
  getUsers: getUsers,
  getUserInfoById: getUserInfoById,
  updateUserInfo: updateUserInfo,
  modifyPassword: modifyPassword,
  disableUser: disableUser,
  enableUser: enableUser,
  saveUserImage: saveUserImage,
  getHotelMoney: getHotelMoney,
  getBankAccountInfo: getBankAccountInfo,
  withdrawCash: withdrawCash,
  getDetailList: getDetailList,
  getStatisticsInfo: getStatisticsInfo,
  queryCustomerList: queryCustomerList,
  getCustomerLoginLog: getCustomerLoginLog,
  getHotelFunctionStatus: getHotelFunctionStatus,
  updateHotelFunctionStatus: updateHotelFunctionStatus,
  getWifiInfo: getWifiInfo,
  saveWifiInfo: saveWifiInfo,
  getMgrPhoneNumber: getMgrPhoneNumber,
  saveMgrPhoneNumber: saveMgrPhoneNumber,
  getManagerLeaveMessage: getManagerLeaveMessage,
  saveManagerLeaveMessage: saveManagerLeaveMessage,
  getInvoiceTypes: getInvoiceTypes,
  saveInvoiceTypes: saveInvoiceTypes,
  getBreakfastCouponInfo: getBreakfastCouponInfo,
  updateBreakfastCouponInfo: updateBreakfastCouponInfo,
  getVipGrades: getVipGrades,
  saveVipGrade: saveVipGrade,
  deleteVipGrade: deleteVipGrade,
  getMiniBarInfo: getMiniBarInfo,
  updateMiniBarInfo: updateMiniBarInfo,
  getCategories: getCategories,
  addCategories: addCategories,
  updateCategoryName: updateCategoryName,
  getProducts: getProducts,
  updateProductStatus: updateProductStatus,
  deleteProduct: deleteProduct,
  saveProduct: saveProduct,
  loginWechat: loginWechat,
  getLoginToken: getLoginToken,
  saveBankAccountInfo: saveBankAccountInfo,
  getQrCodeBase64: getQrCodeBase64,
  bindQrCode: bindQrCode,
  disableRoomQrCode: disableRoomQrCode,
  getQrCodeStream: getQrCodeStream,
  reBindQrCode: reBindQrCode,
  unBindQrCode: unBindQrCode,
  getFinanceDetail: getFinanceDetail,
  downloadBills: downloadBills,
  sendBills2Mail: sendBills2Mail,
  getBreakfastInfo: getBreakfastInfo,
  saveBreakfastInfo: saveBreakfastInfo,
  getBreakfastSetUp: getBreakfastSetUp,
  getCurrentBreakfastVouchers: getCurrentBreakfastVouchers,
  scanCodeCancel: scanCodeCancel,
  numberCancel: numberCancel,
  saveBreakfastVoucherSetUp: saveBreakfastVoucherSetUp,
  getBreakfastMonth: getBreakfastMonth,
  BreakfastDataByMonth: BreakfastDataByMonth,
  deleteCategoryById: deleteCategoryById,
  breakfastQrCodeBase64: breakfastQrCodeBase64,
  breakfastQrCodeStream: breakfastQrCodeStream,
  resetBreakfastQr: resetBreakfastQr,
  getRoomTypeBaseInfo: getRoomTypeBaseInfo,
  getRoomTypeConfigInfo: getRoomTypeConfigInfo,
  saveRoomTypeConfigInfo: saveRoomTypeConfigInfo,
  refusalOrder: refusalOrder,
  hotelAcceptOrder: hotelAcceptOrder,
  getFinance: getFinance,
  getAnSettleList: getAnSettleList,
  getMdWxSettleList: getMdWxSettleList,
  //客房送餐
  getCategoryList: getCategoryList,
  saveCategory: saveCategory,
  mealsDelCategory: mealsDelCategory,
  saveMealInfo: saveMealInfo,
  getMealInfo: getMealInfo,
  mealsSaveProduct: mealsSaveProduct,
  mealsGetProductList: mealsGetProductList,
  mealsDelProduct: mealsDelProduct
}
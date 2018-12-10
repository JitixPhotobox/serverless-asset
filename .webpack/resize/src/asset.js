module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/asset.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asset.js":
/*!**********************!*\
  !*** ./src/asset.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeHandler = exports.metadataHandler = exports.uploadHandler = undefined;

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sharp = __webpack_require__(/*! sharp */ "sharp");
var AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");
var uuid = __webpack_require__(/*! uuid */ "uuid");

AWS.config.update({ region: 'eu-west-1' });
var s3 = new AWS.S3();

var dynamodb = new AWS.DynamoDB();
var client = new AWS.DynamoDB.DocumentClient({ service: dynamodb });

var done = function done(err, res, callback) {
  var result = {
    statusCode: err ? '400' : '200',
    body: err ? err.message : (0, _stringify2.default)(res),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  callback(null, result);
};

var uploadHandler = exports.uploadHandler = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event, context, callback) {
    var body, params, s3Response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = JSON.parse(event.body);
            params = {
              Bucket: process.env.S3_BUCKET,
              Key: 'key/' + body.filename,
              Body: Buffer.from(body.body, 'base64'),
              ContentType: 'image/png'
            };
            _context.next = 4;
            return s3.upload(params).promise();

          case 4:
            s3Response = _context.sent;
            return _context.abrupt('return', done(null, s3Response, callback));

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function uploadHandler(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var metadataHandler = exports.metadataHandler = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(event, context, callback) {
    var body, Item;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(event);
            body = JSON.parse(event.body);
            Item = {
              filename: body.filename,
              uuid: uuid.v4()
            };
            _context2.next = 5;
            return client.put({ "TableName": process.env.DYNAMODB_TABLE, Item: Item }).promise();

          case 5:

            done(null, {}, callback);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function metadataHandler(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var resizeHandler = exports.resizeHandler = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(event, context, callback) {
    var originalKey, key, originalPhoto, buffer;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            originalKey = event.Records[0].s3.object.key;
            key = 'resize/iii-resized.png';


            if (originalKey.includes('resized')) {
              done(null, {}, callback);
            }

            _context3.next = 5;
            return s3.getObject({ Bucket: process.env.S3_BUCKET, Key: originalKey }).promise();

          case 5:
            originalPhoto = _context3.sent;
            _context3.next = 8;
            return Sharp(originalPhoto.Body).resize(100, 100).toBuffer();

          case 8:
            buffer = _context3.sent;
            _context3.next = 11;
            return s3.putObject({
              Body: buffer,
              Bucket: process.env.S3_BUCKET,
              ContentType: 'image/png',
              Key: key
            }).promise();

          case 11:

            done(null, {}, callback);

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function resizeHandler(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

// const key = event.queryStringParameters.key;
// const match = key.match(/((\d+)x(\d+))\/(.*)/);
// const dimensions = match[1];
// const width = parseInt(match[2], 10);
// const height = parseInt(match[3], 10);
// const originalKey = match[4];

// if(ALLOWED_DIMENSIONS.size > 0 && !ALLOWED_DIMENSIONS.has(dimensions)) {
//    callback(null, {
//     statusCode: '403',
//     headers: {},
//     body: '',
//   });
//   return;
// }

// S3.getObject({Bucket: BUCKET, Key: originalKey}).promise()
//   .then(data => Sharp(data.Body)
//     .resize(width, height)
//     .toFormat('png')
//     .toBuffer()
//   )
//   .then(buffer => S3.putObject({
//       Body: buffer,
//       Bucket: BUCKET,
//       ContentType: 'image/png',
//       Key: key,
//     }).promise()
//   )
//   .then(() => callback(null, {
//       statusCode: '301',
//       headers: {'location': `${URL}/${key}`},
//       body: '',
//     })
//   )
//   .catch(err => callback(err))

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),

/***/ "babel-runtime/core-js/json/stringify":
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/json/stringify" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ "babel-runtime/helpers/asyncToGenerator":
/*!*********************************************************!*\
  !*** external "babel-runtime/helpers/asyncToGenerator" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "babel-runtime/regenerator":
/*!********************************************!*\
  !*** external "babel-runtime/regenerator" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),

/***/ "sharp":
/*!************************!*\
  !*** external "sharp" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sharp");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ })

/******/ });
//# sourceMappingURL=asset.js.map
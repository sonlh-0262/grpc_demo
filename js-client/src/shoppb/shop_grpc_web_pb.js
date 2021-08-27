/**
 * @fileoverview gRPC-Web generated client stub for shops
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.shops = require('./shop_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.shops.ShopClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.shops.ShopPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.shops.PrefecturesRequest,
 *   !proto.shops.PrefecturesResponse>}
 */
const methodDescriptor_Shop_PrefectureList = new grpc.web.MethodDescriptor(
  '/shops.Shop/PrefectureList',
  grpc.web.MethodType.UNARY,
  proto.shops.PrefecturesRequest,
  proto.shops.PrefecturesResponse,
  /**
   * @param {!proto.shops.PrefecturesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.shops.PrefecturesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.shops.PrefecturesRequest,
 *   !proto.shops.PrefecturesResponse>}
 */
const methodInfo_Shop_PrefectureList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.shops.PrefecturesResponse,
  /**
   * @param {!proto.shops.PrefecturesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.shops.PrefecturesResponse.deserializeBinary
);


/**
 * @param {!proto.shops.PrefecturesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.shops.PrefecturesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.shops.PrefecturesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.shops.ShopClient.prototype.prefectureList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/shops.Shop/PrefectureList',
      request,
      metadata || {},
      methodDescriptor_Shop_PrefectureList,
      callback);
};


/**
 * @param {!proto.shops.PrefecturesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.shops.PrefecturesResponse>}
 *     Promise that resolves to the response
 */
proto.shops.ShopPromiseClient.prototype.prefectureList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/shops.Shop/PrefectureList',
      request,
      metadata || {},
      methodDescriptor_Shop_PrefectureList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.shops.ShopsByPrefectureRequest,
 *   !proto.shops.ShopsByPrefectureResponse>}
 */
const methodDescriptor_Shop_ShopsByPrefectureList = new grpc.web.MethodDescriptor(
  '/shops.Shop/ShopsByPrefectureList',
  grpc.web.MethodType.UNARY,
  proto.shops.ShopsByPrefectureRequest,
  proto.shops.ShopsByPrefectureResponse,
  /**
   * @param {!proto.shops.ShopsByPrefectureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.shops.ShopsByPrefectureResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.shops.ShopsByPrefectureRequest,
 *   !proto.shops.ShopsByPrefectureResponse>}
 */
const methodInfo_Shop_ShopsByPrefectureList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.shops.ShopsByPrefectureResponse,
  /**
   * @param {!proto.shops.ShopsByPrefectureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.shops.ShopsByPrefectureResponse.deserializeBinary
);


/**
 * @param {!proto.shops.ShopsByPrefectureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.shops.ShopsByPrefectureResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.shops.ShopsByPrefectureResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.shops.ShopClient.prototype.shopsByPrefectureList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/shops.Shop/ShopsByPrefectureList',
      request,
      metadata || {},
      methodDescriptor_Shop_ShopsByPrefectureList,
      callback);
};


/**
 * @param {!proto.shops.ShopsByPrefectureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.shops.ShopsByPrefectureResponse>}
 *     Promise that resolves to the response
 */
proto.shops.ShopPromiseClient.prototype.shopsByPrefectureList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/shops.Shop/ShopsByPrefectureList',
      request,
      metadata || {},
      methodDescriptor_Shop_ShopsByPrefectureList);
};


module.exports = proto.shops;


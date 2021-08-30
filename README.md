# grpc_demo
## Description

This demo will get list prefectures and fetch list shops by selected prefecture

## Install

### Run grpc server:

```
cd server
air # this command will run grpc server and hot reload when code changed 
```

### Run envoy

Envoy is used to change HTTP 1 from JS client to HTTP 2 that is used by GRPC server

```
cd envoy

docker build -t grpc-envoy:1.0 .
docker run --network=host grpc-envoy:1.0
```

### Run JS client

```
cd js-client
npm install
npm start
```

## Notes:

Generate protobuf:

```
cd protos

# Gen for Go file
protoc shop.proto --go_out=plugins=grpc:./../server/shoppb

# Gen for JS file
protoc shop.proto --js_out=import_style=commonjs,binary:./../js-client/src/shoppb --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./../js-client/src/shoppb
```

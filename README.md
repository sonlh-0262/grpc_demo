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

# Hey-Hue ! 

GraphQL Server to interact with your “Philips Hue” Bridge 


## Installation 

``` 
npm install hue-demo
```

## Starting server 

```
npm run start 
```

## Discovering Bridges

```
query {
  DiscoverBridges {
    name
    ipaddress 
  }
}
```

## Getting a client key

First you must click on the button of hue bridge and then create a mutation 

``` 
mutation {
  createClient(ipaddress: "ip address of the hue brige") {
    username 
    clientkey
  }
}

```

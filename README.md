# Hey-Hue ! 

GraphQL Server to interact with your “Philips Hue” Bridge 

This package is in **early stage** of development, do not expect anything to work yet.

## Installation 

``` 
git clone https://github.com/aegypius/hey-hue.git
cd hey-hue
npm install
npx lerna exec npm install
```

## Starting server 

```
npx lerna run start
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

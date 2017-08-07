# Secure Polling System JavaScript client.

This is a JavaScript client for Secure Polling System. This contains the logic necessary to store and display screeds for an individual user.

## API

### ```var client = SPS(storage)```

Create a SPS client that stores the data.

* `storage`: options that can be overridden for data storage defaults, e.g., in the case of implementing this on the phone, desktop, or browser extension.

### ```client.export([opts], cb)```

Return a string that can be used in the `import` function to restore the state of a given user. Options can be passed to export an individual registrar or user.

*TODO: there should be a specification for the file format for these exports/imports that is preferrably human readable and client agnostic*

### ```client.import(data, cb)```

Import the given data from another client to replicate the state of the client.

### ```var user = client.createUser(registrar, identity, [opts])```

* `registrar`: the registrar URL.
* `identity`: A unique string with information that the registrar will use to verify user identity in person.
* `opts`:
  * `tallyspider*: array of preferred tallyspiders

### ```var user = client.getUser(registar, identity, cb)```

Get a user with the given identity.

### ```client.users(cb)```

Get list of users created on this client.

## `User`

### ```user.update(opts, cb)```

Update the user options as provided in `createUser` function.

### ```user.generateKeypair(cb)```

Generates a new keypair and saves it in the Indexeddb. If a keypair already exists for this registrar, return an error.

### ```user.generateBlindedKey(cb)```

App generates and stores a random salt. The registrar sends the client a public subkey. The app uses that public subkey to generate a blinded version of the user's public key. Sends the blinded version to the registrar.

### ```user.signatureValid(cb)```

Returns if the registrar signature locally is valid. Returns false if the registrar signature is expired or not present.

### ```user.getSignature(cb)```

Get the registrar signature for the given identity. If successful, this function will save the registrar signature locally, unblind it using the stored salt, store it locally, and return true. If there is no valid signature, it will return false.

### ```user.screed.append(msg, cb)```
### ```user.screed.remove(index, cb)```
### ```user.screed.list(cb)```

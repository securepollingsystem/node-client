# Secure Polling System JavaScript client.

This is a JavaScript client for Secure Polling System. This contains the logic necessary to generate keys, get the public key signed by the registrar, store, remove, and display the screed for an individual user, and upload the screed to the server.

## API

### ```var client = SPS([storage])```

Create a SPS client that stores the data persistently.

* `storage`: can be overridden for data storage defaults, e.g., in the case of implementing this on the phone, desktop, or browser extension. Default stores the data in Indexeddb

### ```client.export([opts], cb)```

Return a string that can be used in the `import` function to restore the state of a given user. Options can be passed to export an individual registrar or user.

*TODO: there should be a specification for the file format for these exports/imports that is preferrably human readable and client agnostic*

### ```client.import(data, cb)```

Import the given data from another client to replicate the state of the client, or just adding records to local (in the case of importing a single or several users worth of data).

### ```var user = client.createUser(registrar, identity, [opts])```

* `registrar`: the registrar's server URL.
* `identity`: A unique string with information that the registrar will use to verify user identity in person. TODO: add random salt to identity to prevent others from querying registrars' servers on users' behalf, when identity is their Real Name
* `opts`:
  * `tallyspider`: array of preferred tallyspiders (initially populated by registrar server)

### ```var user = client.getUser(registar, identity)```

Get a user with the given identity.

### ```client.users(cb)```

Get list of users created on this client.

## `User`

### ```user.update(opts, cb)```

Update the user options as provided in `createUser` function.

### ```user.generateKeypair(cb)```

Generates a new keypair and saves it in the Indexeddb. If a keypair already exists with a valid registrar signature, return an error, otherwise overwrite an existing signature.

### ```user.sendBlindedKey(cb)```

App generates and stores a random salt. The client acquires a public subkey from the registrar. The app uses that public subkey to generate a blinded version of the user's public key, then sends the blinded version to the registrar.

### ```user.signatureValid(cb)```

Returns true if the locally-stored registrar signature is valid. Returns false if the registrar signature is expired or not present.

### ```user.getSignature(cb)```

Get the registrar signature for the given identity. This function will attempt to retrieve the registrar's signature of user's blinded key, unblind it using the stored salt, store the result (a signature of user's public key) locally, and return true. If there is no valid signature data supplied by the registrar, it will return false.

### ```user.screed.append(msg, cb)```

Add a message to the local screed.

### ```user.screed.remove(index, cb)```

Remove a message from the local screed using the given index.

### ```user.screed.list(cb)```

List the current messages in the local screed, along with their indexes.

### ```user.uploadScreed(cb)```

Uploads the user's local screed to the registrar. If there is no valid signature for the user's registrar, or the server refuses to accept, or can't be reached, will return an error.

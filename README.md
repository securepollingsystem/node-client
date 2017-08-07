# Secure Polling System JavaScript client.

This is a JavaScript client for Secure Polling System. This contains the logic necessary to store and display screeds for an individual user.

## User Story

A person wants to express what they think about key issues in their organization or community. The community runs a registrar server (link), say at registrar.omnicommons.org.

A user is presented with the option to register or browse. Once the person is registered, they will have a keypair and a signature saved on their computer somewhere. In this client, the keypair and signature is stored in Indexeddb. In other non-browser based implementations such as desktop or phone, the keys could be stored elsewhere on the filesystem.

A user can add statements they agree with by typing in a new phrase or adding an existing phrase to their phrase list. Then when the user is done with all of their statements, they can hit 'send' and all of their updated phrases will be sent to the server. They should show up in the tallyspider in near-real time, potentially with some lag depending on the efficiency and architecture of the tallyspider.

Once the keys are available, the user can see a 'settings' page, a 'public phases' page, and 'my phrases' page.

The 'Settings' page has:
  1. *Export*: Download the keys to a file, which can be uploaded or revoked in case the original keys are lost.
  2. *Change Tallyspiders*: Every registrar has a default tally spider which counts the votes. However, anyone can run a tallyspider to count the votes. A user can use other tallyspiders here if you don't want to use the default.

The 'Public phrases' page has:
  1. *List*: List the phrases from the chosen tallyspider, sorted by the number of users.
  2. *Search*: Search phrases in the tallyspider.
  3. *Add to my phrases*: Add a given phrase to my list of phrases.

The 'My phrases' page has:
  1. *List*: List my phrases. These are all stored locally in the user's history.
  2. *Add*: Add a new phrase to my list of phrases.
  3. *Delete*: Delete a phrase from my list of phrases.
  4. *Send*: Send the phrases to the registrar.


They go to a website that is tallying, e.g., tally.berkeleypost.com.

## API

### ```client.generateKeypair()```

Generates a new elliptic curve keypair.

### ```client.screed(msg, registrarSignature, cb)```

Create a SPS screed for the given message. Requires a registrar signature, which will be included in the screed. cb returns (err, screed)

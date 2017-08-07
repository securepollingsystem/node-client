user opens app
creates new profile
app generates key pair
app contacts registrar's server to get calendar availability and a set of blinding keys 
app generates random salt and blinds public key using registrar's blinding keys
app sends blinded key to registrar
registrar acknowledges receipt of blinded key and full name as written on user's ID card
optional: user selects date time and location from what registrar offers as available
user shows up at registrar's office, presents self along with ID card
registrar sees that they match and uses registrar app to sign stored blinded key
app receives signed blinded key from registrar's server
app unblinds signed key using stored random salt, resulting in a signature of public key
app stores registrar's signature of user's public key for use in sending screeds to server
user is ready to send screeds to server and have them be accepted

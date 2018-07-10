const email = require('emailjs');

module.exports = options => {
  let server = email.server.connect(options);

  return (to, title, content) => {
    server.send()
  };  
};

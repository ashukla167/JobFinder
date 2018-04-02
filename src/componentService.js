export default {
    getAllCities: function(){
      return fetch('https://craft-demo-intuit.herokuapp.com/cities')
          .then(response=>response.json())
          .catch(e=>Promise.reject("cities call failed"))
          .then(response=>Promise.resolve(response))
    },
    getAlltransport: function() {
      return fetch('https://craft-demo-intuit.herokuapp.com/vehicles')
        .then(response => response.json())
        .catch(e => Promise.reject("vehicles call failed"))
        .then(response => Promise.resolve(response))
    },
    intializeUserToken: function() {
      const data = {
        method: 'POST', // or 'PUT'
        body: "",
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      }
  
      return fetch('https://craft-demo-intuit.herokuapp.com/token', data)
        .then(response => response.json())
        .catch(e => Promise.reject("token Intialization failed"))
        .then(response => Promise.resolve(response))
    },
    findJob: function(formData) {
      const data = {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(formData),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      }
  
      return fetch('https://craft-demo-intuit.herokuapp.com/find ', data)
        .then(response => response.json())
        .catch(e => Promise.reject("submit failed"))
        .then(response => Promise.resolve(response))
    }
  
  }
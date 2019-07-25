const axios = require("axios")
axios({
  url: 'http://localhost:4000/graphql',
  method: 'post',
  data: {
    query: `
      query{
  myprofile(id:10){
    id
    username
    phone
   
  }
}
      `
  }
}).then((result) => {
  console.log(result.data)
});
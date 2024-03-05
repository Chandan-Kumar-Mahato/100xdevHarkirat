
    import axios from 'axios'
    async function handleApi()  {
       try {
           const response = await axios.get('http://localhost:3000/');
           console.log(response.data);
       } catch (error) {
           console.log(error);
       }
   }
handleApi();


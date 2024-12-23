import axios from 'axios';

let backendUrl = 'http://localhost:8080';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsiaWQiOjEwLCJ1c2VyTmFtZSI6Im1hbWJhd2VpIn0sImV4cCI6MTczNDk5MDYzNn0.E_169nYPBNy_zl7hgc4SxeixcaPf4VFJhHbgaynw2ME";


export async function getArticleByID(articleId) {
    try{
        const response = axios.get(backendUrl + '/search/article/doc/'+articleId, {
            headers:{
                'Authorization': token,
            }
        });
        return response.data;
    }catch(error){
        console.log(error);
        throw error;
    }
}
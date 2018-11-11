import { HttpClient, HttpHeaders } from "@angular/common/http"
export class config {

    public static getHeader() {
        let value = localStorage.getItem('token');
        var headers1;
        let headers: HttpHeaders = new HttpHeaders(headers1);
        let jwt = JSON.parse(value)
        headers = headers.append('Authorization', 'Bearer' + jwt)
        console.log(headers)
        return headers
    }
}
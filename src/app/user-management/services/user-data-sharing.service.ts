import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { WebApiService } from '../services/web-api.service';

@Injectable()
export class UserDataSharingService {

  constructor(private httpClient: HttpClient) { }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  public URL = 'http://localhost:3000';

  public auth = new AuthService(this.http, this.URL);
  public admin = new AdminService(this.http, this.URL);

  public user = new UserService(this.http, this.URL);
  public course = new CourseService(this.http, this.URL);
  public event = new EventService(this.http, this.URL);
}

class AuthService {
  constructor(private http: HttpClient, private URL: string) { }

  register(form: any) {
    return this.http.post(`${this.URL}/auth/register`, (form.value));

  }

  UserLogin(form: any) {
    return this.http.post(`${this.URL}/auth/login`, (form.value));
  }

  PermissionRedirect(n: number) {
    if (n == 3)
      return "student"
    else if (n == 2)
      return "instructor"
    else if (n == 1)
      return "admin"
    else
      return "null"
  }
  setLocal(obj: any) {
    localStorage.setItem("user", JSON.stringify(obj))
  }
  getLocal() {
    return localStorage.getItem("user");
  }
  clearLocal() {
    localStorage.clear();
  }
}

class AdminService {
  constructor(private http: HttpClient, private URL: string) { }


  UserAll = () => {
    return this.http.post(`${this.URL}/user/find`, {});
  }
  UserOne = (id: any) => {
    return this.http.post(`${this.URL}/user/find/${id}`, {});
  }
  UserConfirm = (id: any) => {
    return this.http.post(`${this.URL}/user/confirm/${id}`, {});
  }
  UserDelete = (id: any) => {
    return this.http.post(`${this.URL}/user/delete/${id}`, {});
  }
  UserUpdate = (id: any, data: any) => {
    return this.http.post(`${this.URL}/user/update/${id}`, data);
  }

  CourseAll = () => {
    return this.http.post(`${this.URL}/course/find`, {});
  }
  CourseOne(uid: any) {
    return this.http.post(`${this.URL}/course/find/${uid}`, {});
  }
  CourseUpdate = (id: any, data: any) => {
    return this.http.post(`${this.URL}/course/update/${id}`, data);
  }
  CourseDelete = (id: any) => {
    return this.http.post(`${this.URL}/course/delete/${id}`, {});
  }
}

class UserService {
  constructor(private http: HttpClient, private URL: string) { }


  GetDetails(uid: any) {
    return this.http.post(`${this.URL}/user/find/${uid}`, {});
  }
}

class CourseService {
  constructor(private http: HttpClient, private URL: string) { }
  CourseAll = () => {
    return this.http.post(`${this.URL}/course/find`, {});
  }
  CourseOne(uid: any) {
    return this.http.post(`${this.URL}/course/find/${uid}`, {});
  }
  CourseParticipants(id: any) {
    return this.http.post(`${this.URL}/course/participant/${id}`, {});
  }
  CourseByUser = (uid: string) => {
    return this.http.post(`${this.URL}/course/user/${uid}`, {});
  }
  CourseCreate = (uid: string, data: any) => {
    return this.http.post(`${this.URL}/course/create/${uid}`, data);
  }
  CourseUpdate = (id: any, data: any) => {
    return this.http.post(`${this.URL}/course/update/${id}`, data);
  }
  CourseDelete = (id: any) => {
    return this.http.post(`${this.URL}/course/delete/${id}`, {});
  }
  CourseJoin(uid: any, cid: any) {
    return this.http.post(`${this.URL}/course/join/${cid}`, { uid });

  }
}

class EventService {
  constructor(private http: HttpClient, private URL: string) { }

  EventAll() {
    return this.http.post(`${this.URL}/event/find`, {});
  }
  EventOne(uid: any) {
    return this.http.post(`${this.URL}/event/find/${uid}`, {});
  }
  EventByUser = (uid: string) => {
    return this.http.post(`${this.URL}/event/user/${uid}`, {});
  }
  EventCreate = (uid: string, data: any) => {
    return this.http.post(`${this.URL}/event/create/${uid}`, data);
  }
  EventUpdate = (id: any, data: any) => {
    return this.http.post(`${this.URL}/event/update/${id}`, data);
  }
  EventDelete = (id: any) => {
    return this.http.post(`${this.URL}/event/delete/${id}`, {});
  }
}


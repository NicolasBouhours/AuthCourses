import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs/Rx';
import { User } from './user.interface';

declare var firebase: any;

@Injectable()
export class AuthService {

  constructor(private router: Router) {}

  signupUser(user: User) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .catch((error) => console.log(error));
    }

  signinUser(user: User) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .catch((error) => console.log(error));
  }

  isAuthenticated(): Observable<boolean> {
    /*var user = firebase.auth().currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }*/
    const subject = new Subject<boolean>();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        subject.next(true);
      } else {
        subject.next(false);
      }
    });
    return subject.asObservable();
  }

  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/signin']);
  }
}
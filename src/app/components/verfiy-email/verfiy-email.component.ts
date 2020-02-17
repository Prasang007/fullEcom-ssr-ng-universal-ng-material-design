import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verfiy-email',
  templateUrl: './verfiy-email.component.html',
  styleUrls: ['./verfiy-email.component.css']
})
export class VerfiyEmailComponent implements OnInit {
loading = false;
  constructor(private shared: SharedService, private route: ActivatedRoute, private router: Router) {
   }

  ngOnInit() {
    this.shared.isLoading.subscribe((v) => {
      this.loading = v;
      });
    const params = this.route.params['value'];
    console.log(params);
    this.shared.verifyJwt(params).subscribe(data => {
      const payload = data;
      this.shared.verificationEmailcheck('email', payload['email']).subscribe(user => {
        console.log(user);
        if (user) {
          console.log('asdasu');
          this.shared.localStorage.setItem('currentUser', JSON.stringify(user));
          this.shared.currentUserSubject.next(user);
          this.shared.loggedIn = true;
          this.router.navigateByUrl('/products');
          return;
          } else {
            this.router.navigateByUrl('/login');
          }
      });
    });
  }

}

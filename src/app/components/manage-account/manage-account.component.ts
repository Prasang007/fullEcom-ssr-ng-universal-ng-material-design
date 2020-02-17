import { User } from './../../users';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateEmail, validateCapital, validateNumber, validateSpecial } from 'src/app/validators/formValidators';
import { SharedService } from 'src/app/shared/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
  updateForm: FormGroup;
  newPsdForm: FormGroup;
  showPassord;
  currentUser: User;
  changePassword: boolean;
  allowChangePsd: boolean;
  constructor(private shared: SharedService, private router: Router) { }

  ngOnInit() {
    this.changePassword = false;
    this.allowChangePsd = false;
    this.showPassord = false;
    this.shared.setTitle('Manage Account ');
    this.currentUser = this.shared.currentUserValue;
    this.initializeForm();
  }
  initializeForm() {
    this.updateForm =  new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl({value: '', disabled: true}, [ Validators.required, validateEmail]),
    });
    this.newPsdForm = new FormGroup({
      newPassword: new FormControl('', [ Validators.required, Validators.minLength(8),
        validateCapital,
        validateNumber,
        validateSpecial]),
    });
  }
  updateAccount(formValue) {
    const value2 = {_id: this.shared.currentUserValue._id, name: formValue.name };
    this.shared.updateAccount(value2).subscribe( success => {
      this.shared.openSnackbar( success , 'Close');
      this.shared.currentUserValue.name = formValue.name;
    });
  }
  checkPsd(oldPassword: string) {
    const user = {_id: this.shared.currentUserValue._id, password: oldPassword};
    this.shared.checkPsd(user).subscribe(correctPsd => {
      if (correctPsd) {
        this.allowChangePsd = true;
      } else {
        this.shared.openSnackbar('Incorrect Password', 'Close');
      }
    });
  }
  setNewPsd(newPsd) {
    const user = {_id: this.shared.currentUserValue._id, password: newPsd};
    this.shared.updatePsd(user).subscribe(success => {
      this.shared.openSnackbar( success , 'Close');
      this.router.navigateByUrl('/products');
    });
  }
}

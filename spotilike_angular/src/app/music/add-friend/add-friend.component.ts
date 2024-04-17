import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OnlineStatusService } from 'src/online-status.service';
import { Friend } from 'src/app/models/friend.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})

export class AddFriendComponent implements OnInit, OnDestroy {
  friendsForm: FormGroup = this.fb.group({friends: this.fb.array([])});
  friendSubscribe!: Subscription;
  isLoaded = false;

  constructor(
    private fb: FormBuilder,
    private onlineStatusService: OnlineStatusService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.friendSubscribe) {
      this.friendSubscribe.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (!this.friendSubscribe) {
      this.friendSubscribe = this.onlineStatusService.connectionChanged.subscribe(isOnline => {
        if (isOnline) {
          console.log('Online');
        } else {
          console.log('Offline');
        }
      });
    }
    // Test add 
    this.addFriendForm({ _id: "1", name: 'John Doe', email: 'john@example.com' });
    this.addFriendForm({ _id: "2", name: 'Jane Smith', email: 'jane@example.com' });
    this.isLoaded = true;
  }

  myFriendForm() {
    return (this.friendsForm.get('friends') as FormArray);
  }
  
  addFriendForm(friend: Friend | null = null) {
    if (friend) {
      const friendForm = this.fb.group({
        id: [friend._id],
        name: [friend.name, Validators.required],
        email: [friend.email, [Validators.required, Validators.email]]
      });
      this.myFriendForm().push(friendForm);
    } else {
      const friendForm = this.fb.group({
        id: [],
        name: [null,Validators.required],
        email: [null,[Validators.required, Validators.email]]
      });
      this.myFriendForm().push(friendForm);
    }
  }

  deleteFriendForm(friendIndex: number) {
    this.myFriendForm().removeAt(friendIndex);
  }

  async sendItemsFromIndexedDb() {
    // Add index db
  }

  goBack(): void {
    this.router.navigate(['/albums']);
  }
}
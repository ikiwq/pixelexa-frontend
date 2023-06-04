import { Component, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent{

  star = faStar;
  
  constructor(){}

  @Input() user : UserModel | null = null
}

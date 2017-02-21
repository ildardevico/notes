import { Component, Input } from '@angular/core'

@Component({
  selector: 'coustom-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls:['./dropdown.component.css']
})
export class DropdownComponent {
  @Input() options = [];
  @Input() currentOption = {};
  @Input() selectHandler: Function;
  opened = false;
  toogleDropdown = () => this.opened = !this.opened;
  selectOption = (option): void => {
    this.currentOption = option
    this.selectHandler(option)
    this.toogleDropdown()
  }
}

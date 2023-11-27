import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit{
  // variable to store incoming data from pareny
   @Input() childAcno:String|undefined

  //  event creation
  // event name
 @Output() onCancel=new EventEmitter()
@Output() onDelete = new EventEmitter
  constructor(){
  }

  ngOnInit(): void {
    
  }
  cancelDelete(){
  this.onCancel.emit()
  }
  deleteConf(){
  this.onDelete.emit(this.childAcno)
  }

}

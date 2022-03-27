import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentType, IComment } from 'src/app/models';
@Component({
  selector: 'app-cost-comment',
  templateUrl: './cost-comment.component.html',
  styleUrls: ['./cost-comment.component.scss']
})
export class CostCommentComponent implements OnInit {
  @Input() isAdding = false;
  @Input() set comment(_comment: IComment) {
    this._comment = _comment;
    this.isEditing = this._comment.type === undefined;
  };
  get comment() {
    return this._comment;
  }
  @Output() onDelete = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<IComment>();

  isEditing = false;
  commentTypes = [CommentType.Internal, CommentType.External];
  form: FormGroup;

  private _comment: IComment;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      type: [this.comment.type, Validators.required],
      comment: [this.comment.comment, Validators.required]
    });
  }

  edit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.form.patchValue({
        type: this.comment.type,
        comment: this.comment.comment
      })
    }
  }

  delete() {
    this.onDelete.emit();
  }

  saveComment() {
    this.isEditing = !this.isEditing;
    if (this.isAdding) {
      this.onSave.emit(this.form.getRawValue());
    }

  }
}

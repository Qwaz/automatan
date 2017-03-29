import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: 'labeled-input',
    template: `
<div class="input-field">
    <input *ngIf="!!placeholder" [(ngModel)]="value" id="{{input_id}}" placeholder="{{placeholder}}" type="text" class="validate">
    <input *ngIf="!placeholder" [(ngModel)]="value" id="{{input_id}}" type="text" class="validate">
    <label for="{{input_id}}">{{input_label}}</label>
</div>
`
})
export class LabeledInputComponent {
    private innerValue: string = "";

    @Input() input_id: string;
    @Input() input_label: string;
    @Input() placeholder: string = "";

    get value() {
        return this.innerValue;
    }

    @Input() set value(newValue: string) {
        this.innerValue = newValue;
        this.valueChange.emit(this.innerValue);
    }

    @Output() valueChange = new EventEmitter();
}
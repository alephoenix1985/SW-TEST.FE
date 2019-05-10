import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.sass']
})
export class ConfirmComponent implements OnInit {
    title: any;
    message: any;
    labelNo: any;
    labelYes: any;
    onOk: any;

    constructor() {
    }

    ngOnInit() {
    }
}

import {Component} from "@angular/core";

export class File {
    fileName: String;
}

@Component({
    selector: 'my-app',
    template: `
<nav>
    <div class="nav-wrapper">
        <span class="brand-logo center">Automatan</span>
    </div>
</nav>
<div class="app-main">
<div class="row">
    <div class="col s8">
        <table class="highlight">
            <thead>
                <tr><th data-field="fileName">Files</th></tr>
            </thead>
            <tbody>
                <tr *ngFor="let file of files"><td>{{file.fileName}}</td></tr>
            </tbody>
        </table>
    </div>
    <div class="col s4">
        Action Menu Here
    </div>
</div>
</div>
`
})

export class AppComponent {
    files: File[] = [
        { fileName: 'Gochuumon wa Usagi Desuka 2 - 01 (BD 1280x720 x264 AAC)' },
        { fileName: 'Gochuumon wa Usagi Desuka 2 - 02 (BD 1280x720 x264 AAC)' },
        { fileName: 'Gochuumon wa Usagi Desuka 2 - 03 (BD 1280x720 x264 AAC)' },
        { fileName: 'Gochuumon wa Usagi Desuka 2 - 04 (BD 1280x720 x264 AAC)' },
    ];
}
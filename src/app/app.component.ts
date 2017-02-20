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
<div class="container">
<ul>
    <li *ngFor="let file of files">{{file.fileName}}</li>
</ul>
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
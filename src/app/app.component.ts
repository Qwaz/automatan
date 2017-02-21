import {Component} from "@angular/core";
declare let Materialize: Materialize.Materialize;

export class File {
    fileName: String;
}

@Component({
    selector: 'my-app',
    template: `
<div class="flex-v-container" id="main-window">
    <nav class="flex-none">
        <div class="nav-wrapper">
            <span class="brand-logo center">Automatan</span>
        </div>
    </nav>
    <div class="flex1 flex-h-container">
        <div class="flex2">
            <table class="highlight">
                <thead>
                    <tr><th data-field="fileName">Files</th></tr>
                </thead>
                <tbody>
                    <tr *ngFor="let file of files"><td>{{file.fileName}}</td></tr>
                </tbody>
            </table>
        </div>
        <div class="flex1 border-left flex-v-container inner-padding">
            <div class="flex1">
                <form>
                    <div class="input-field">
                        <input id="raws_info" placeholder="(not detected)" type="text" class="validate">
                        <label for="raws_info">Raws</label>
                    </div>
                    <div class="input-field">
                        <input id="title_info" value="Gochuumon wa Usagi Desuka 2" type="text" class="validate">
                        <label for="title_info">Title</label>
                    </div>
                    <div class="input-field">
                        <input id="episode_style_info" value=" - %" type="text" class="validate">
                        <label for="episode_style_info">Episode</label>
                    </div>
                    <div class="input-field">
                        <input id="codec_info" value="(BD 1280x720 x264 AAC)" type="text" class="validate">
                        <label for="codec_info">Codec</label>
                    </div>
                </form>
            </div>
            <div class="flex-none" id="actions">
                <a class="btn-floating btn-large waves-effect waves-light right"><i class="material-icons">done</i></a>
            </div>
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

    ngAfterViewInit() {
        Materialize.updateTextFields();
    }
}
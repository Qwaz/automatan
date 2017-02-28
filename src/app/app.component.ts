import {Component} from "@angular/core";

declare let Materialize: Materialize.Materialize;

export interface File {
    name: string;
    path: string;
    size: number;
    type: string;
}

export enum PatternException {
    Empty,
    Various
}

export interface Pattern {
    raws: PatternException | string;
    title: PatternException | string;
    episode: PatternException | string;
    codec: PatternException | string;
}

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    files: File[] = [];

    exceptionString(pattern: PatternException | string) {
        if (pattern === PatternException.Empty) return "(not detected)";
        else if (pattern === PatternException.Various) return "(various)";
        else return "";
    }

    patternString(pattern: PatternException | string) {
        if (typeof pattern === "string") {
            return pattern;
        } else {
            return "";
        }
    }

    initialPattern: Pattern = {
        raws: PatternException.Empty,
        title: "Gochuumon wa Usagi Desuka 2",
        episode: PatternException.Various,
        codec: "(BD 1280x720 x264 AAC)",
    };

    targetPattern: Pattern;

    ngAfterViewChecked() {
        Materialize.updateTextFields();
    }

    onDropFiles(e: DragEvent) {
        console.log(e);

        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            let f = e.dataTransfer.files[i];
            console.log(f);
            this.files.push({
                name: f.name,
                path: f.path,
                size: f.size,
                type: f.type
            });
        }
        this.files.sort((f1, f2) => f1.name.localeCompare(f2.name));

        console.log(this.files);

        return false;
    }

    clearFiles() {
        this.files = [];
    }

    private parsePattern() {
        this.targetPattern = {
            raws: this.patternString(this.initialPattern.raws),
            title: this.patternString(this.initialPattern.title),
            episode: this.patternString(this.initialPattern.episode),
            codec: this.patternString(this.initialPattern.codec),
        };
    }

    constructor() {
        this.parsePattern();
    }
}
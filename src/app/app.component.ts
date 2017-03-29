import {AfterViewChecked, Component} from "@angular/core";

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

type PatternValue = PatternException | string;

export interface Pattern {
    raws: PatternValue;
    title: PatternValue;
    episode: PatternValue;
    codec: PatternValue;
}

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewChecked {
    files: File[] = [];

    exceptionString(patternValue: PatternValue) {
        if (patternValue === PatternException.Empty) return "(not detected)";
        else if (patternValue === PatternException.Various) return "(various)";
        else return "";
    }

    patternString(patternValue: PatternValue) {
        if (typeof patternValue === "string") {
            return patternValue;
        } else {
            return "";
        }
    }

    initialPattern: Pattern = {
        raws: PatternException.Empty,
        title: PatternException.Empty,
        episode: PatternException.Empty,
        codec: PatternException.Empty,
    };

    targetPattern: Pattern;

    ngAfterViewChecked() {
        Materialize.updateTextFields();
    }

    onDropFiles(e: DragEvent) {
        function updatePattern(pattern: Pattern, key: keyof Pattern, value: string): void {
            if (typeof pattern[key] == 'string') {
                if (pattern[key] != value) {
                    pattern[key] = PatternException.Various;
                }
            } else {
                if (pattern[key] == PatternException.Empty) {
                    pattern[key] = value;
                }
            }
        }

        function episodePatternExtract(episodePattern: string, episodeNumber: string): string {
            let lastIndex = episodePattern.lastIndexOf(episodeNumber);
            let len = episodeNumber.length;

            return episodePattern.substring(0, lastIndex) +
                    '?' + episodePattern.substring(lastIndex+len);
        }

        let pattern: RegExp = /^((?:\[.*\])?)\s*(.*?(?:[_\s]S?\d+)?)\s+((?:[\-#제第E]|Ep\.?|OP|ED|Vol\.?)?\s*(\d+(?:\.\d)?)(?:[화話]|s|ns)?)(.*?)\s*(\([^()]{5,}\))?\..{2,4}$/i;

        console.log(e);

        this.initialPattern.raws = PatternException.Empty;
        this.initialPattern.title = PatternException.Empty;
        this.initialPattern.episode = PatternException.Empty;
        this.initialPattern.codec = PatternException.Empty;

        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            let f = e.dataTransfer.files[i];
            console.log(f);

            let match = pattern.exec(f.name);

            if (match) {
                this.files.push({
                    name: f.name,
                    path: f.path,
                    size: f.size,
                    type: f.type
                });

                updatePattern(this.initialPattern, 'raws', match[1]);
                updatePattern(this.initialPattern, 'title', match[2]);
                updatePattern(this.initialPattern, 'episode', episodePatternExtract(match[3], match[4]));
                updatePattern(this.initialPattern, 'codec', match[6]);

                console.log(match);
            } else {
                alert(`Cannot parse "${f.name}"`);
            }
        }
        this.files.sort((f1, f2) => f1.name.localeCompare(f2.name));

        this.parsePattern();

        return false;
    }

    clearFiles() {
        this.files = [];

        this.initialPattern = {
            raws: PatternException.Empty,
            title: PatternException.Empty,
            episode: PatternException.Empty,
            codec: PatternException.Empty,
        };

        this.parsePattern();
    }

    private parsePattern() {
        if (this.initialPattern.raws == '') {
            this.initialPattern.raws = PatternException.Empty;
        }
        if (this.initialPattern.title == '') {
            this.initialPattern.title = PatternException.Empty;
        }
        if (this.initialPattern.episode == '') {
            this.initialPattern.episode = PatternException.Empty;
        }
        if (this.initialPattern.codec == '') {
            this.initialPattern.codec = PatternException.Empty;
        }

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
import {AfterViewChecked, Component} from "@angular/core";

declare let Materialize: Materialize.Materialize;

export interface File {
    name: string;
    path: string;
    size: number;
    type: string;
    targetName: string;
}

interface ParsedAnimeName {
    raws: string;
    title: string;
    episodeFull: string;
    episodeNumber: string;
    etc: string;
    codec: string;
    extension: string;
}

function parseAnimeName(animeName: string): ParsedAnimeName | null {
    let pattern: RegExp = /^((?:\[.*\])?)\s*(.*?(?:[_\s]S?\d+)?)\s+((?:[\-#제第E]|Ep\.?|OP|ED|Vol\.?)?\s*(\d+(?:\.\d)?)(?:[화話]|s|ns)?)(.*?)\s*(\([^()]{5,}\))?\.(.{2,4})$/i;

    let match = pattern.exec(animeName);

    return {
        raws: match[1],
        title: match[2],
        episodeFull: match[3],
        episodeNumber: match[4],
        etc: match[5],
        codec: match[6],
        extension: match[7],
    };
}

function extractEpisodePattern(parsed: ParsedAnimeName): string {
    let lastIndex = parsed.episodeFull.lastIndexOf(parsed.episodeNumber);
    let len = parsed.episodeNumber.length;

    return parsed.episodeFull.substring(0, lastIndex) +
        '?' + parsed.episodeFull.substring(lastIndex+len);
}

export enum PatternException {
    Clear,
    Various,
}

export interface InitialPattern {
    raws: PatternException | string;
    title: PatternException | string;
    episode: PatternException | string;
    codec: PatternException | string;
}

export interface TargetPattern {
    raws: string;
    title: string;
    episode: string;
    codec: string;
}

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewChecked {
    files: File[] = [];

    exceptionString(patternValue: PatternException | string) {
        if (patternValue === PatternException.Clear) return "(not detected)";
        else if (patternValue === PatternException.Various) return "(various)";
        else return "";
    }

    patternString(patternValue: PatternException | string) {
        if (typeof patternValue === "string") {
            return patternValue;
        } else {
            return "";
        }
    }

    initialPattern: InitialPattern = {
        raws: PatternException.Clear,
        title: PatternException.Clear,
        episode: PatternException.Clear,
        codec: PatternException.Clear,
    };

    targetPattern: TargetPattern;

    ngAfterViewChecked() {
        Materialize.updateTextFields();
    }

    onDropFiles(e: DragEvent) {
        console.log(e);
        this.clearInitialPattern();

        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            let f = e.dataTransfer.files[i];
            console.log(f);

            let parsed = parseAnimeName(f.name);
            if (parsed) {
                this.files.push({
                    name: f.name,
                    path: f.path,
                    size: f.size,
                    type: f.type,
                    targetName: f.name,
                });

                this.updateInitialPattern('raws', parsed.raws);
                this.updateInitialPattern('title', parsed.title);
                this.updateInitialPattern('episode', extractEpisodePattern(parsed));
                this.updateInitialPattern('codec', parsed.codec);
            } else {
                alert(`Cannot parse "${f.name}"`);
            }
        }
        this.files.sort((f1, f2) => f1.name.localeCompare(f2.name));

        this.updateTargetPattern();

        return false;
    }

    clearFiles() {
        this.files = [];

        this.clearInitialPattern();
        this.updateTargetPattern();
    }

    updateFiles() {
        function applyPattern(initialPattern: PatternException | string, targetPattern: string, originalValue: string) {
            if (initialPattern == PatternException.Various && targetPattern == '') return originalValue;
            return targetPattern;
        }

        this.files.forEach((file) => {
            let parsed = parseAnimeName(file.name);

            if (parsed) {
                let raws = applyPattern(this.initialPattern.raws, this.targetPattern.raws, parsed.raws);
                let title = applyPattern(this.initialPattern.title, this.targetPattern.title, parsed.title);
                let episode = applyPattern(
                    this.initialPattern.episode,
                    this.targetPattern.episode.replace('?', parsed.episodeNumber),
                    parsed.episodeFull);
                let codec = applyPattern(this.initialPattern.codec, this.targetPattern.codec, parsed.codec);

                file.targetName = `${raws} ${title} ${episode} ${codec}`.trim() + `.${parsed.extension}`;
            }
        });
    }

    confirmChange() {
        // TODO: update real filename
    }

    private updateInitialPattern(key: keyof InitialPattern, value: string): void {
        let pattern = this.initialPattern;

        if (typeof pattern[key] == 'string') {
            if (pattern[key] != value) {
                pattern[key] = PatternException.Various;
            }
        } else {
            if (pattern[key] == PatternException.Clear) {
                pattern[key] = value;
            }
        }
    }

    private clearInitialPattern() {
        this.initialPattern.raws = PatternException.Clear;
        this.initialPattern.title = PatternException.Clear;
        this.initialPattern.episode = PatternException.Clear;
        this.initialPattern.codec = PatternException.Clear;
    }

    private updateTargetPattern() {
        if (this.initialPattern.raws == '') {
            this.initialPattern.raws = PatternException.Clear;
        }
        if (this.initialPattern.title == '') {
            this.initialPattern.title = PatternException.Clear;
        }
        if (this.initialPattern.episode == '') {
            this.initialPattern.episode = PatternException.Clear;
        }
        if (this.initialPattern.codec == '') {
            this.initialPattern.codec = PatternException.Clear;
        }

        this.targetPattern = {
            raws: this.patternString(this.initialPattern.raws),
            title: this.patternString(this.initialPattern.title),
            episode: this.patternString(this.initialPattern.episode),
            codec: this.patternString(this.initialPattern.codec),
        };
    }

    constructor() {
        this.updateTargetPattern();
    }
}
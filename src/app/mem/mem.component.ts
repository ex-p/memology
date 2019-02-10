import {Component, OnInit} from '@angular/core';
import {ServerService} from '../server.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-mem',
    templateUrl: './mem.component.html',
    styleUrls: ['./mem.component.scss']
})
export class MemComponent implements OnInit {

    constructor(private server: ServerService) {
    }

    public Mems: Array<Mem> = new Array<Mem>();

    ngOnInit() {

        this.server.loadMems().subscribe((e: Array<Mem>) => {
            e.forEach((v, i) => {
                this.Mems.push(v);
            });
        });
    }

}

class Mem {
    public title: string;
    public image: string;
    public description: string;
}

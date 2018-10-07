import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ActorService } from '../shared/actor.service';
import { Actor } from '../shared/actor';
import { UtilsService } from '../../../shared/services/utils.service';

@Component({
  selector: 'app-actor-id',
  templateUrl: './actor-id.component.html',
  styleUrls: ['./actor-id.component.css']
})
export class ActorIdComponent implements OnInit {

  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) { }

  actor: Actor;
  actorId: number;
  images: {}[];
  isUploaded: boolean = true;

  showActor() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.actorId = +params.get("id");
      this.actorService.loadActorById(this.actorId)
        .subscribe((actor: Actor) => {
          this.utilsService.setIsUploaded(this.isUploaded = false)
          this.actor = actor
        });
    })
  }

  getPosters(): void {
    this.actorService.loadImages(this.actorId)
      .subscribe(data => this.images = [...data]);
  }

  ngOnInit() {
    this.showActor();
    this.getPosters();
    this.utilsService.setIsUploaded(this.isUploaded);
    this.utilsService.scrorollToTop();
  }

}

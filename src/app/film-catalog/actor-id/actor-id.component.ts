import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ActorService } from '../../shared/services/actor.service';
import { Actor } from '../../shared/models/actor';
import { ListenerDownloadsService } from '../../shared/services/listenerDownloads.service';

@Component({
  selector: 'app-actor-id',
  templateUrl: './actor-id.component.html',
  styleUrls: ['./actor-id.component.css']
})
export class ActorIdComponent implements OnInit {

  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute,
    private listenerDownloadsService: ListenerDownloadsService
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
          this.listenerDownloadsService.setIsUploaded(this.isUploaded = false)
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
    this.listenerDownloadsService.setIsUploaded(this.isUploaded);
  }

}

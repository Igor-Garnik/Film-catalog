import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ActorService } from '../../shared/services/actor.service';
import { Actor } from '../../shared/models/actor';

@Component({
  selector: 'app-actor-id',
  templateUrl: './actor-id.component.html',
  styleUrls: ['./actor-id.component.css']
})
export class ActorIdComponent implements OnInit {

  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute
  ) { }

  actor: Actor;
  actorId: number;

  showActor() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.actorId = +params.get("id");
      this.actorService.loadActorById(this.actorId)
        .subscribe((actor: Actor) => this.actor = actor);
    })
  }

  getPosters(): void {

  }


  ngOnInit() {
    this.showActor();

  }

}

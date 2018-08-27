import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ActorService } from '../../service/actor.service';
import { Actor } from '../../models/actor';

@Component({
  selector: 'app-actor-id',
  templateUrl: './actor-id.component.html',
  styleUrls: ['./actor-id.component.css']
})
export class ActorIdComponent implements OnInit {

  constructor(
    private actorService: ActorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  actor: Actor;
  id: number;

  showActor() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get("id");
      this.actorService.getActorById(this.id)
        .subscribe((actor: Actor) => {
          console.log(actor)
          this.actor = actor
        })
    })
  }

  ngOnInit() {
    this.showActor();
  }

}

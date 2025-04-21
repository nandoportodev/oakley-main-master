import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from '../../../Moment';
import { MomentService } from '../../../services/moment.service';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-edit-moment',
  standalone: false,
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css',
})
export class EditMomentComponent implements OnInit {
  moment!: Moment;
  btnText: string = 'editar';

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });
  }
  async editHandler(momentData: Moment) {
    const id = String(this.route.snapshot.paramMap.get('id'));

    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('image', momentData.image);
    formData.append('description', momentData.description);

    await this.momentService.updateMoment(id!, formData).subscribe();

    this.messageService.add(`Momento editado com sucesso!`);

    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../../Moment';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MessagesService } from '../../../services/messages.service';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  standalone: false,
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css',
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
  
    if (id) {
      this.momentService.getMoment(id).subscribe({
        next: (response) => {
          this.moment = response.data;
          console.log('Momento carregado:', this.moment); // Verifique se o ID está presente
        },
        error: (err) => {
          console.error('Erro ao buscar o momento:', err);
          this.messagesService.add('Erro ao carregar o momento.');
        },
      });
    } else {
      console.error('ID inválido ou não encontrado na URL.');
      this.messagesService.add('ID inválido ou não encontrado.');
    }
  }

  removeHandler(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtém o ID da URL novamente

    if (!id) {
      console.error('ID inválido ou não encontrado.');
      this.messagesService.add('ID inválido ou não encontrado.');
      return;
    }

    console.log('Removendo momento com ID:', id);

    this.momentService.removeMoment(id).subscribe({
      next: () => {
        this.messagesService.add('Momento removido com sucesso!');
        this.router.navigate(['/']); // Redireciona para a página inicial
      },
      error: (err) => {
        console.error('Erro ao remover o momento:', err);
        this.messagesService.add('Erro ao remover o momento.');
      },
    });
  }
}
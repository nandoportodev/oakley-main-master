import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../../Moment';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MessagesService } from '../../../services/messages.service';
import { Comment } from '../../../Comment';
import { FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-moment',
  standalone: false,
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.momentService.getMoment(id).subscribe({
        next: (response) => {
          this.moment = response.data;
        },
        error: () => {
          this.messagesService.add('Erro ao carregar o momento.');
        },
      });
    } else {
      this.messagesService.add('ID inválido ou não encontrado.');
    }

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.commentForm ? this.commentForm.get('text') : null;
  }
  
  get username() {
    return this.commentForm ? this.commentForm.get('username') : null;
  }

  edittHandler(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.router.navigate([`/moments/edit/${id}`]);
    }
  }

  removeHandler(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.momentService.removeMoment(id).subscribe({
      next: () => {
        this.messagesService.add('Momento removido com sucesso!');
        this.router.navigate(['/']);
      },
      error: () => {
        this.messagesService.add('Erro ao remover o momento.');
      },
    });
  }

  onSubmit(formDirective: FormGroupDirective): void {
    const momentId = this.route.snapshot.paramMap.get('id');
    console.log('Moment ID:', momentId);
  
  
    if (this.commentForm.invalid || !momentId) {
      console.log('Form inválido ou ID ausente');
      return;
    }
  
    const data: Comment = this.commentForm.value;
    data.momentId = momentId; // Usando o ID capturado da rota
  
    this.commentService.createComment(data).subscribe({
    next: (comment) => {
      this.messagesService.add('Comentário adicionado com sucesso!');
      this.commentForm.reset();
      formDirective.resetForm();

      // Atualiza o momento para buscar os comentários atualizados
      this.momentService.getMoment(momentId).subscribe((moment) => {
        this.moment = moment.data;
      });
    },
      error: () => {
        this.messagesService.add('Erro ao adicionar comentário.');
      },
    });
  }
}

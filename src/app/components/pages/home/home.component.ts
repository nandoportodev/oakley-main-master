import { Component, OnInit } from '@angular/core';
import { Moment } from '../../../Moment';
import { MomentService } from '../../../services/moment.service';
import { environment } from '../../../../environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Response } from '../../../Response';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerms: string = '';

  constructor(private momentService: MomentService) {}
  ngOnInit(): void {
    this.momentService.getMoments().subscribe((response: any) => {
      console.log(response); // Verifique a estrutura da resposta no console
      this.moments = response.data.map((moment: any) => ({
        id: moment.id || moment._id, // Ajuste para o nome correto
        title: moment.title,
        created_at: new Date(moment.created_at).toLocaleDateString('pt-BR'), // Formata a data
        image: moment.image,
        description: moment.description, // preciso melhorar esse bloco para o antigo map.
      }));
    });
  }
 /* ngOnInit(): void {
    this.momentService.getMoments().subscribe((response) => {
      const data = response.data;
  
      console.log('Dados retornados pela API:', data); // Adicione este log
  
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-br');
        item.id = item.id
      });
  
      this.allMoments = data;
      this.moments = data; // Exibe os momentos na página
    });
  }*/
    search(e: Event): void {

      const target = e.target as HTMLInputElement
      const value = target.value

      this.moments  = this.allMoments.filter((moment) => {
       return moment.title.toLowerCase().includes(value)
    });

    }
}

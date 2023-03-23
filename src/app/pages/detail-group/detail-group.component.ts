import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { MutationResult } from 'apollo-angular';
import { GroupModule } from 'src/app/models/group.module';
import { InteractionModule } from 'src/app/models/interaction.module';
import { GroupService } from 'src/app/services/group.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-detail-group',
  templateUrl: './detail-group.component.html',
  styleUrls: ['./detail-group.component.scss']
})
export class DetailGroupComponent {

  @ViewChild('refInputFile') refInputFile!: ElementRef<HTMLInputElement>

  public interaction!: InteractionModule;

  public file!: File;
  public imgTemp: any;

  constructor(
    private fb: FormBuilder,
    private interactionService: InteractionService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private uploadService: UploadService
  ){}
    
  ngOnInit(): void {
      

    const id = this.route.snapshot.paramMap.get('id') || '0';

    this.interactionService.getGroupInteracionByUidUser(id)
      .subscribe((result: ApolloQueryResult<any>) => {
        if (result.error){

        }else{

          console.log(result.data);
          
          this.interaction = result.data.findGroupInteraction;
          console.log(this.interaction);
          
        }
        
      })

  }

  public editClick = (event:any) => {
    event.srcElement.parentElement.firstChild.disabled = false;
    event.srcElement.parentElement.firstChild.classList.add('select')
    event.srcElement.parentElement.children[1].hidden = true;
    event.srcElement.parentElement.children[2].hidden = false;
    event.srcElement.parentElement.children[3].hidden = false;
  }
  
  public saveClick = (event:any) => {
    event.srcElement.parentElement.firstChild.disabled = true;
    event.srcElement.parentElement.firstChild.classList.remove('select')
    event.srcElement.parentElement.children[1].hidden = false;
    event.srcElement.parentElement.children[2].hidden = true;
    event.srcElement.parentElement.children[3].hidden = true;

    const data = {
      idGroup: this.interaction.group_from.id,
      title: this.interaction.group_from.title,
      description: this.interaction.group_from.description,
    }

    if(event.srcElement.parentElement.firstChild.name === 'title'){
      data.title = event.srcElement.parentElement.firstChild.value;
    }
    if(event.srcElement.parentElement.firstChild.name === 'description'){
      data.description = event.srcElement.parentElement.firstChild.value;
    }

    this.groupService.updateGroup({
      idGroup: data.idGroup,
      description: data.description,
      title: data.title
    }).subscribe((resp) => {
      if (resp.errors){
        console.log(resp.errors);
      }else{
        console.log(resp.data);
      }
    });
    
  }

  public changeStatus = (event:any) => {
    let only_mod_host = this.interaction.group_from.only_mod_host;
    let allow_image = this.interaction.group_from.allow_image;
    
    
    if(event.srcElement.parentElement.firstChild.name === 'allow_image'){
      allow_image = !allow_image;
    }
    if(event.srcElement.parentElement.firstChild.name === 'only_mod_host'){
      only_mod_host = !only_mod_host;
    }

    const data = {
      idGroup: this.interaction.group_from.id,
      allow_image: allow_image,
      only_mod_host: only_mod_host
    }

    this.groupService.updateGroup(data).subscribe((resp:MutationResult<any>) => {
      if (resp.errors){
        console.log(resp.errors);
      }else{
      }
    });

  }

  public cancelClick = (event:any) => {
    event.srcElement.parentElement.firstChild.disabled = true;
    event.srcElement.parentElement.firstChild.classList.remove('select')
    event.srcElement.parentElement.children[1].hidden = false;
    event.srcElement.parentElement.children[2].hidden = true;
    event.srcElement.parentElement.children[3].hidden = true;
    if(event.srcElement.parentElement.firstChild.name === 'title'){
      event.srcElement.parentElement.firstChild.value = this.interaction.group_from.title;
    }
    if(event.srcElement.parentElement.firstChild.name === 'description'){
      event.srcElement.parentElement.firstChild.value = this.interaction.group_from.description;
    }
    
  }

  public selectImage = (event:any) => {

    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    
    if (file){
      this.file = file;
      
      const reader = new FileReader();
      const url64 = reader.readAsDataURL(this.file);

      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }

    //   this.uploadService.uploadImageUser(event.srcElement.files[0])
    //     .then(resp => {
    //       console.log(resp);
    //     })
    //     .catch((resp:any) => 
    //       console.log(resp)
    //     )

    // }else{
    //   console.log('No hay archivo seleccionado');
      
    }

  }

  public saveImage = (event:any) => {

    if (this.file){
      
      // this.imgTemp = null;
      this.uploadService.uploadImageGroup(this.file, this.interaction.group_from.id)
        .then(resp => {
          console.log(resp);
        })
        .catch((resp:any) => {
          this.interaction.group_from.image = resp.image;
          // TODO: Aqui no se actualiza, hacer con eventos soclet para la actualizacion de imagenes en el perfil
        });

    }else{
      console.log('No hay archivo seleccionado');
      
    }

  }

  public onPressInputFile = () => {
    this.refInputFile.nativeElement.click()
  }
}

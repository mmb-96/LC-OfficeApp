import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

import { Material } from '../models/material.model';
import { MaterialsService } from '../materials.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-material-edit',
  templateUrl: './material-edit.page.html',
  styleUrls: ['./material-edit.page.scss'],
})
export class MaterialEditPage implements OnInit {

  form: FormGroup;

  public loadedMaterial: Material;

  constructor( private materrialSrvc: MaterialsService, private route: ActivatedRoute, private navCtrl: NavController, private toastCtrl: ToastController, private router: Router ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paranMap => {
      if ( !paranMap.has('materialId')) {
        this.navCtrl.navigateBack('/materials');
        return;
      }
      this.materrialSrvc.getMaterial(paranMap.get('materialId')).subscribe(material =>{
        this.loadedMaterial = material;

        this.form = new FormGroup({
          title: new FormControl(this.loadedMaterial.name, {
            updateOn: "change",
            validators: [Validators.required]
          }),
          description: new FormControl(this.loadedMaterial.description, {
            updateOn: "change",
            validators: [Validators.required, Validators.maxLength(50)]
          }),
          quantity: new FormControl(this.loadedMaterial.quantity, {
            updateOn: "change",
            validators: [Validators.required, Validators.min(1)]
          }),
        });
      });
    });
  }

  editMatirial() {
    this.materrialSrvc.updateMaterial(this.loadedMaterial.id, this.form.value.title, this.form.value.description, this.form.value.quantity)
    .subscribe(() => {
      this.toastCtrl.create({
        animated: true,
        duration: 4000,
        position: 'top',
        showCloseButton: true,
        message: 'El elemento se editó correctamente.'
      }).then(toastCtrl => {
        toastCtrl.present();
        this.router.navigate(['/materials'])
      })
    });
  }
}
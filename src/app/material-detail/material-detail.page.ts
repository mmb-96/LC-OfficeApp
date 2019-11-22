import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Material } from '../models/material.model';
import { MaterialsService } from '../materials.service'; 

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.page.html',
  styleUrls: ['./material-detail.page.scss'],
})
export class MaterialDetailPage implements OnInit {

  public loadedMaterial: Material;

  constructor(private materrialSrvc: MaterialsService, private route: ActivatedRoute, private navCtrl: NavController ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paranMap => {
      if ( !paranMap.has('materialId')) {
        this.navCtrl.navigateBack('/materials');
        return;
      }
      this.materrialSrvc.getMaterial(paranMap.get('materialId')).subscribe(material =>{
        this.loadedMaterial = material;
      });
    });
  }

}

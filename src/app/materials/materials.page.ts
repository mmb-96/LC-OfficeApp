import { Component, OnInit } from '@angular/core';
import { Material } from '../models/material.model';
import { MaterialsService } from '../materials.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.page.html',
  styleUrls: ['./materials.page.scss'],
})
export class MaterialsPage implements OnInit {

  public loadedMaterial: Material[];

  constructor(private materrialSrvc: MaterialsService, private router: Router) { }

  ngOnInit() {
    this.materrialSrvc.materials.subscribe( materials => {
      this.loadedMaterial = materials;
    });
  }

  onEditOffer(materialId: String, slidingItem: IonItemSliding) {
    this.router.navigate(['/', 'materials', 'edit', materialId]);
    slidingItem.close();
  }
}

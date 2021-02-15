import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection';
import { CollectionService } from '../collection.service';
import { TokenStorageService } from '../token-storage.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  collections: Collection[];
  constructor(private collectionService: CollectionService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken() == null){
      this.router.navigate(['login']);

    }else{
      this.getCollections();
    }
  }

  getCollections(): void {
    this.collectionService.getCollections()
    .subscribe(collections => this.collections = collections);
  }

}

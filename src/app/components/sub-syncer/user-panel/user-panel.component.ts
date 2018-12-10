import { Component, OnInit } from '@angular/core';
import { UserService, User, Node, Tree, Video } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  nodes:Node[];
  trees:Tree[];
  videos:Video[];

  constructor(private userService:UserService) { 
    userService.getUserNodes().subscribe((nodes:Node[]) => {
      this.nodes = nodes;
      userService.getTreesFromNodes(nodes).subscribe((trees:Tree[]) => {
        this.trees = trees;
        userService.getVideosFromTrees(trees).subscribe((videos:Video[]) => {
          this.videos = videos;
        })
      });
    })
  }

  ngOnInit() {
  }

}

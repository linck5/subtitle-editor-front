import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, filter, flatMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api:ApiService) { }

  getUserNodes() {
    return this.api.get<User>('userjwt').pipe(
      flatMap(
        (user) => {
          let query = 'nodes?'
          for (let i = 0; i < user.node_ids.length; i++)
            query+=`${i == 0 ? '' : '&'}ids[]=${user.node_ids[i]}`
          return this.api.get<Node[]>(query)
        }
      )
      // flatMap(
      //   user => [this.api.get<Node>(`nodes`),user]
      // ),
      // tap(arr => console.log(arr[1]._id)),
      // filter(
      //   arr => arr[0].collaborators.includes(arr[1]._id)
      // ),
      // map(
      //   arr => arr[0]
      // )
    )
  }

  getTreesFromNodes(nodes:Node[]) {
    let query = 'trees?'
    for (let i = 0; i < nodes.length; i++)
      query+=`${i == 0 ? '' : '&'}ids[]=${nodes[i].tree_id}`
    return this.api.get<Tree[]>(query)
  }

  getVideosFromTrees(trees:Tree[]) {
    let query = 'videos?'
    for (let i = 0; i < trees.length; i++)
      query+=`${i == 0 ? '' : '&'}ids[]=${trees[i].video_id}`
    return this.api.get<Video[]>(query)
  }

}


export class User{
  _id:number;
  username: string;
  password: string;
  roles: string[];
  node_ids: number[];
  creation: Date;
  lastOnline: Date;
  banned: boolean;
  active: boolean;
}

export class Node {
    _id:number;
    collaborators: number[];
    status: string;
    deleted: boolean;
    tree_id: number[];
    //the source node of a rebased node is the node that rebased into
    //the mainline
    source_id: number[];
    isInMainline: boolean;
    //the node index from where this node is based on. When a node is added
    //to the mainline it receives the current mainline length (which is kept in
    //the tree doc) -1 as its mainline base index.
    //This is used for:
    //1- finding all the nodes in the mainline and sorting them
    //2- see on which node a node outside the mainline is based on (for merging)
    mlBaseIndex: number;
}

export class Tree {
  _id:number;
  description: string;
  language: string;
  video_id: number;
  subtitle_id:number;
  creation: Date;
  mainlineLength: number;
}

export class Video {
  _id:number;
  name: string;
  description: string;
  duration: number;
  url: string;
  creation: Date;
  tree_ids: number;
}
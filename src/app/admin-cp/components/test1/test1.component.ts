import { Component, OnInit } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { concatMap, tap, concat } from 'rxjs/operators';
import { ApiService } from '../../../shared/api.service';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component implements OnInit {

  stuff: String;

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.stuff = 'hey!';
  }

  async test() {

    const api = this.apiService;

    api.logApi = true;

    let video = await api.get("video/5b23eb8c429a142998c1c654").toPromise();
    let subtitle = await api.get("subtitle/5b4e393ffa63a06878e26a9d").toPromise();
    let user = await api.get("user/5b19c4c5376a4848c03b0747").toPromise() //admin3


    if(video && subtitle && user){

      await api.delete("trees").toPromise();

      let tree1 = await api.post("trees", {
        language: "jp",
        description: "a test tree",
        video_id: video._id,
        subtitle_id: subtitle._id
      }).toPromise();


      let node1t1 = await api.post("nodes", {
        creator_id: user._id,
        tree_id: tree1._id
      }).toPromise();

      let commit1n1t1 = await api.post("commits", {
        description: "",
        node_id: node1t1._id
      }).toPromise();

      let change1c1b1t1 = await api.post("changes", {
        line_ids: [5],
        user_id: user._id,
        commit_id: commit1n1t1._id,
        node_id: node1t1._id,
        type: "EDIT",
        data: {
          text: "普通な漢字"
        }
      }).toPromise();

      let node2t1 = await api.post("nodes", {
        creator_id: user._id,
        tree_id: tree1._id
      }).toPromise();

      let commit1b2t1 = await api.post("commits", {
        description: "",
        node_id: node2t1._id
      }).toPromise();

      let change1c1n2t1 = await api.post("changes", {
        line_ids: [
          1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,
          20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,
          36,37,38,39,40
        ],
        user_id: user._id,
        commit_id: commit1b2t1._id,
        node_id: node2t1._id,
        type: "TIME_SHIFT",
        data: {
          timeShift: -22
        }
      }).toPromise();

      await api.patch("commit/" + commit1b2t1._id, {
        description: "ajusted the timing",
        done: true
      }).toPromise();

      await api.patch("node/" + node2t1._id, {
        status: "FINISHED"
      }).toPromise();

      await api.patch("node/" + node2t1._id, {
        status: "APPROVED"
      }).toPromise();

    }
    else{
      console.error("couldn't get data")
    }

  }

  ngOnInit() {

    console.log("calling test");

    //this.test();


  }

}

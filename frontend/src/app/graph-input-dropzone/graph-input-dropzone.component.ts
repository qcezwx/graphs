import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from "ngx-file-drop";
import {GraphService} from "../graph/graph.service";
import {GraphData} from "../graph/graph-data.model";
import {Graph} from "../graph/Graph";

@Component({
  selector: 'app-graph-input-dropzone',
  templateUrl: './graph-input-dropzone.component.html',
  styleUrls: ['./graph-input-dropzone.component.scss']
})
export class GraphInputDropzoneComponent implements OnInit {
  public files: UploadFile[] = [];

  @Output()
  graphDataChanged: EventEmitter<GraphData> = new EventEmitter();

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(droppedFile.relativePath, file);

          // You could upload it like this:
          let formData = new FormData();
          formData.append('graph', file, droppedFile.relativePath);

          this.graphService.getGraphFromFile(formData).subscribe((graph: Graph) => {
            let result: GraphData = {nodes: [], links: []};

            for (let i = 0; i < graph.nodes.length; i++) {
              result.nodes.push({
                id: graph.nodes[i].nodeId,
                weight: graph.nodes[i].weight,
                group: 3
              });
            }

            for (let i = 0; i < graph.links.length; i++) {
              result.links.push({
                source: graph.links[i].nodeId1,
                target: graph.links[i].nodeId2,
                weight: graph.links[i].weight,
                group: 3
              });
            }

            this.graphDataChanged.emit(result);
            console.log(result)
          });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  constructor(private graphService: GraphService) {
  }

  ngOnInit() {
  }

}

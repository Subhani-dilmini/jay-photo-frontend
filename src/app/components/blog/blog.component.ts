import { Component , OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-blog',
  imports: [RouterModule, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit{
  //global variable to store the blog data to be displayed in the template(html)
  blogs: any[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getBlogs().subscribe(data => {
      this.blogs = data;
    })
  }

  getBlogs() {
    
  }

}

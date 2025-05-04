import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-post',
  imports: [RouterModule],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit{
  blogId : string = '';
  blog: any;

constructor(
  private blogService: BlogService,
  private route: ActivatedRoute,) { }

  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id')!;
    this.blogService.getBlog(parseInt(this.blogId)).subscribe(data => {
      this.blog = data;
    })
  }
}
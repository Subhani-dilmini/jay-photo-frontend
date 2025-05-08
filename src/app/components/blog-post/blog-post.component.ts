import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog-post',
  imports: [RouterModule],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit{
  blogId : string = '';
  blog: any;
  role: any;

constructor(
  private blogService: BlogService,
  private route: ActivatedRoute,
  private authService: AuthService,
) { }

  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id')!;
    this.role = this.authService.getRole();
    this.blogService.getBlog(parseInt(this.blogId)).subscribe(data => {
      this.blog = data;
    })
  }
}
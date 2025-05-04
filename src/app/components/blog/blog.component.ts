import { Component , OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CommonModule, NgFor } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog',
  imports: [RouterModule, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit{
  //global variable to store the blog data to be displayed in the template(html)
  blog: any[] = [];
  role: any;

  constructor(
    private blogService: BlogService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.blogService.getBlogs().subscribe(data => {
      this.blogs = data;
    })
    this.role = this.authService.getRole();
  }

  getBlogs() {
    
  }

}
